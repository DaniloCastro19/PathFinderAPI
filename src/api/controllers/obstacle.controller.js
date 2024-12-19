import ObstacleService from "../../core/services/obstacle.service.js";
const obstacleService = new ObstacleService();
import { ENTITY_NOT_FOUND } from "../../core/utils/customError.js";
import ObstacleDTO from "../DTOs/obstacle.dto.js";
import { logger } from "../../core/utils/logger.js";

export const createObstacle = async (req, res, next) => { 
    try{
        const obstacle = await obstacleService.createEntity(req.body);
        const obstacleDTO = new ObstacleDTO(obstacle);
        return res.status(201).json(obstacleDTO);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}
export const getObstacle = async (req, res, next) => { 
    try{
        const obstacle = await obstacleService.getEntity(req.params.id);
        if(!obstacle){throw ENTITY_NOT_FOUND('Obstacle')}
        const obstacleDTO = new ObstacleDTO(obstacle);
        return res.json(obstacleDTO);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const updateObstacle = async (req, res, next) => { 
    try{
        const obstacle = await obstacleService.updateEntity(req.params.id, req.body);
        if(!obstacle){throw ENTITY_NOT_FOUND('Obstacle')}
        return res.json({message: 'Obstacle updated succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
    
}

export const deleteObstacle = async (req, res, next) => { 
    try{
        const wasDeleted = await obstacleService.deleteEntity(req.params.id);
        if(!wasDeleted){throw ENTITY_NOT_FOUND('Obstacle')}
        
        return res.json({message: 'Obstacle deleted succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}
