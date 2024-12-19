import ApiUsageService from "../../core/services/stats.service.js";
import { logger } from "../../core/utils/logger.js";

const apiUsageService = new ApiUsageService();


export const getRequestStats = async (req, res, next) =>{ 
    try{
        const stats = await apiUsageService.getRequestStats();
        res.status(200).send(stats);
    }catch(error){
        logger.error(error.message);
        next(error);
    }
}

export const getResponseTimes =  async (req, res, next) =>{ 
    try{
        const stats = await apiUsageService.getResponseTimeStats();
        res.status(200).send(stats);
    }catch(error){
        logger.error(error.message);
        next(error);
    }
}
    
export const getStatusCodes =  async (req, res, next) =>{ 
    try{
        const stats = await apiUsageService.getStatusCodeStats();
        res.status(200).send(stats);
    }catch(error){
        logger.error(error.message);
        next(error);
    } 
}
export const getPopularEndpoints =  async (req, res, next) =>{ 
    try{
        const stats = await apiUsageService.getPopularEndpoints();
        res.status(200).send(stats);
    }catch(error){
        logger.error(error.message);
        next(error);
    }
}
// }