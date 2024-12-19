import WaypointService from "../../core/services/waypoint.service.js";
const waypointService = new WaypointService();
import { ENTITY_NOT_FOUND } from "../../core/utils/customError.js";
import WaypointDTO from "../DTOs/waypoint.dto.js";
import { logger } from "../../core/utils/logger.js";

export const createWaypoint = async (req, res, next) => { 
    try{
        const waypoint = await waypointService.createEntity(req.body);
        const waypointDTO = new WaypointDTO(waypoint);
        return res.status(201).json(waypointDTO);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const getWaypoint = async (req, res, next) => { 
    try{
        const waypoint = await waypointService.getEntity(req.params.id);
        if(!waypoint){throw ENTITY_NOT_FOUND('Waypoint')}
        const waypointDTO = new WaypointDTO(waypoint);
        return res.json(waypointDTO);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const updateWaypoint = async (req, res, next) => { 
    try{
        const waypoint = await waypointService.updateEntity(req.params.id, req.body);
        if(!waypoint){throw ENTITY_NOT_FOUND('Waypoint')}
        return res.json({message:'Waypoint updated succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
    
}

export const deleteWaypoint = async (req, res, next) => { 
    try{
        const wasDeleted = await waypointService.deleteEntity(req.params.id);
        if(!wasDeleted){throw ENTITY_NOT_FOUND('Waypoint')}
        
        return res.json({message:'Waypoint deleted succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}