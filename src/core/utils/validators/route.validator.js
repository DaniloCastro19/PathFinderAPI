import { check } from "express-validator";
import { validateResult } from "./resultValidator.js"; 
import MapService from "../../services/map.service.js";
import {logger} from '../../utils/logger.js'

const mapService = new MapService();

const validatePointWithinMap = function (point, map) {
    if (parseInt(point.x) > parseInt(map.dimensions.width) || parseInt(point.y) > parseInt(map.dimensions.height)) {
        const error= new Error(`Start or ends of route exceeds Map dimensions. Please, don't exceed the follow dimensions: x:${map.dimensions.width}, y:${map.dimensions.height}`);
        logger.error(error.message);
        throw error;
    }
};
export const validateCreateRoute = [

    check("start.*").isInt().withMessage("Start points must be int."),
    check("end.*").isInt().withMessage("End points must be int."),
    check('map_id')
    .custom( async (value, {req})=>{
        const map = await mapService.getEntity(value);
        if (map==null){
            const error = new Error("Map doesn't exist in database")
            logger.error(error.message);
            throw error;
        }
        validatePointWithinMap(req.body.start, map);
        validatePointWithinMap(req.body.end, map);
        return true;
    }),
    (req,res,next) => {
        validateResult(req,res,next)
    }

]

