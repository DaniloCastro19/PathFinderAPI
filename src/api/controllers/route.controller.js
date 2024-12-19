import RouteService from "../../core/services/route.service.js";
const routeService = new RouteService();
import { ENTITY_NOT_FOUND, DUPLICATED_ENTITY } from "../../core/utils/customError.js";
import RouteDTO from "../DTOs/route.DTO.js";
import { logger } from "../../core/utils/logger.js";

export const createRoute = async (req, res, next) => { 
    try{
        const newRoute = await routeService.createRoute( req.body);
        if(newRoute==null) throw DUPLICATED_ENTITY('This Map already have a route defined!');
        const routeDTO = new RouteDTO(newRoute);
        return res.status(201).json({message: 'The points and the map are valid and exist in the database.', data:routeDTO});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const getRoute= async (req, res, next) => { 
    try{
        const route= await routeService.getRoute(req.params.id);
        if(!route){throw ENTITY_NOT_FOUND('Route')}
        const routeDTO = new RouteDTO(route);
        return res.json(routeDTO);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}

export const deleteRoute = async (req, res, next) => { 
    try{
        const wasDeleted = await routeService.deleteRoute(req.params.id);
        if(!wasDeleted){throw ENTITY_NOT_FOUND('Route')}
        
        return res.json({message:'Route deleted succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
}