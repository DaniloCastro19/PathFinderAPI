import MapService from "../../core/services/map.service.js";
const mapService = new MapService();
import RouteMapValidator from '../../core/utils/routeMapValidator.js';
import { ENTITY_NOT_FOUND } from "../../core/utils/customError.js";
import MapDTO from "../DTOs/map.dto.js";
import { logger } from "../../core/utils/logger.js";
const routeMapValidator = new RouteMapValidator();
export const createMap = async (req, res, next) => { 
    try{
        const map = await mapService.createEntity(req.body);
        const mapDTO = new MapDTO(map);
        return res.status(201).json(mapDTO);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const getMap = async (req, res, next) => { 
    try{
        let message = 'The map has been correctly configured with obstacles and stopping points.'
        const map = await mapService.getEntity(req.params.id);
        if(!map){throw ENTITY_NOT_FOUND('Map')};
        const validateRoute = routeMapValidator.validateMapRoute(map);
        if (!validateRoute){message = 'The map does not have a route with Obstacles and Waypoints defined.'};  
        const mapDTO = new MapDTO(map);
        return res.json({message: message, data: mapDTO});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const updateMap = async (req, res, next) => { 
    try{
        const map = await mapService.updateEntity(req.params.id, req.body);
        if(!map){throw ENTITY_NOT_FOUND('Map')};
        return res.json({message:'Map updated succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    }; 
    
}
export const deleteMap = async (req, res, next) => { 
    try{
        const wasDeleted = await mapService.deleteEntity(req.params.id);
        if(!wasDeleted){throw ENTITY_NOT_FOUND('Map')};
        
        return res.json({message:'Map deleted succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}
