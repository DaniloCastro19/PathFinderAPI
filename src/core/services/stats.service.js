import ApiUsage from "../models/apiUsage.model.js";

export default class ApiUsageService {
    constructor() {
        this.apiUsageModel = ApiUsage;
    }

    //Adding the total of request by endpoint and method
    getRequestStats = async () =>{
        const stats = await this.apiUsageModel.findAll();
        const result = stats.reduce((acc, usage)=>{
            acc.total_requests+= usage.requestCount;
            if(!acc.breakdown[usage.endpointAccess]){
                acc.breakdown[usage.endpointAccess] ={};
            }

            if(!acc.breakdown[usage.endpointAccess][usage.requestMethod]){
                acc.breakdown[usage.endpointAccess][usage.requestMethod]= 0;
            }

            acc.breakdown[usage.endpointAccess][usage.requestMethod] += usage.requestCount;
            return acc;
        },{total_requests: 0, breakdown: {}});
        
        return result;
    }

    //Reducing the data to obtain response times by endpoint
    getResponseTimeStats = async () => {
        const stats = await this.apiUsageModel.findAll();
        const result = stats.reduce((acc, usage)=>{
            if(!acc[usage.endpointAccess]){
                acc[usage.endpointAccess]={
                    avg:0,
                    min:Number.MAX_SAFE_INTEGER,
                    max:Number.MIN_SAFE_INTEGER
                }
            }
            acc[usage.endpointAccess].avg = (acc[usage.endpointAccess].avg + usage.responseTime.avg)/2;
            acc[usage.endpointAccess].min = Math.min(acc[usage.endpointAccess].min, usage.responseTime.min);
            acc[usage.endpointAccess].max = Math.max(acc[usage.endpointAccess].max, usage.responseTime.max);
            return acc;
        },{});
        
        return result;
    }

    //Reducing data to count status codes
    getStatusCodeStats = async () => {
        const stats = await this.apiUsageModel.findAll();
        const result = stats.reduce((acc, usage)=>{
            if(!acc[usage.statusCode]){
                acc[usage.statusCode]=0;
            }
            acc[usage.statusCode]+= usage.requestCount;
            return acc;
        }, {});
        
        return result;
    }

    //Reducing to fin most popular endpoint
    getPopularEndpoints = async () => {
        const stats = await this.apiUsageModel.findAll();
        const result = stats.reduce((acc, usage)=>{
            if(usage.requestCount > acc.request_count){
                acc.most_popular = usage.endpointAccess;
                acc.request_count = usage.requestCount;
            }
            return acc;
        }, {most_popular:null,request_count:0});
        return result;        
    }

}