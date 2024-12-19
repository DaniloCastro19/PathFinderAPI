import OptimalPathService from "../../core/services/optimalPath.service.js";
const optimalPathService = new OptimalPathService();
import { DUPLICATED_ENTITY, ENTITY_NOT_FOUND } from "../../core/utils/customError.js";
import OptimalPathDTO from "../DTOs/optimalPath.dto.js";
import { logger } from "../../core/utils/logger.js";


export const createOptimalPath = async (req, res,next) => { 
    try{
        const newOptimalPath = await optimalPathService.createRoute(req.body);
        if(newOptimalPath==null) throw DUPLICATED_ENTITY("Optimal Path");
        const optimalPathDTO = new OptimalPathDTO(newOptimalPath);
        return res.status(201).json({message: 'The map route was successfully completed, avoiding obstacles and passing through the stopping points.', data:optimalPathDTO});
    }catch(error){
        logger.error(error.message);
        next(error)
    };
}

export const getOptimalPath= async (req, res, next) => { 
    try{
        const optimal_path= await optimalPathService.getRoute(req.params.id);
        if(!optimal_path){throw ENTITY_NOT_FOUND("Optimal path")};
        const optimalPathDTO = new OptimalPathDTO(optimal_path);
        return res.json(optimalPathDTO);
    }catch(error){
        logger.error(error.message);
        next(error)
    };
}

export const deleteOptimalPath = async (req, res, next) => { 
    try{
        const wasDeleted = await optimalPathService.deleteRoute(req.params.id);
        if(!wasDeleted){throw ENTITY_NOT_FOUND("Optimal path")};
        
        return res.json({message:'Optimal Path deleted succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error)
    };
}