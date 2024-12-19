import ApiUsage from "../../core/models/apiUsage.model.js";

const apiUsageTrack = () => async (req,res,next) => {
    const start = performance.now();// to catch the initial time

    res.on('finish', async () => {
        const end = performance.now(); // to catch the end time
        const executionTime = end - start; //calculate the response time in miliseconds
        const formattedTime = parseFloat(executionTime.toFixed(3));        

        const {method, originalUrl} = req;
        const {statusCode} = res;

        let apiUsage = await ApiUsage.findOne({
            where: {
                endpointAccess:originalUrl,
                requestMethod:method,
                statusCode:statusCode
            }
        });

        if (apiUsage){
            //Updating existing data
            apiUsage.requestCount++;
            apiUsage.responseTime.avg = (apiUsage.responseTime.avg * (apiUsage.requestCount - 1)+ executionTime)/apiUsage.requestCount;
            apiUsage.responseTime.min = Math.min(apiUsage.responseTime.min, formattedTime);
            apiUsage.responseTime.max = Math.max(apiUsage.responseTime.max, formattedTime);
            apiUsage.timestamp = new Date();
            await apiUsage.save();
        }else{
            //Create new entry data
            await ApiUsage.create({
                endpointAccess: originalUrl,
                requestMethod: method,
                statusCode: statusCode,
                responseTime: {
                    avg: formattedTime,
                    min:  formattedTime,
                    max: formattedTime                
                },
                requestCount: 1,
                timestamp: new Date(),
            });
        }
    });
    next();
};

export default apiUsageTrack;