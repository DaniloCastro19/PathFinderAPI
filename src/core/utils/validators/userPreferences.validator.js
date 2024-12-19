import { check } from "express-validator";
import { validateResult } from "./resultValidator.js"; 
import Obstacle from "../../models/obstacle.model.js";
import Waypoint from "../../models/waypoint.model.js";
import PositionValidator from "./positionValidator.js";
import Map from "../../models/map.model.js";
const positionValidator = new PositionValidator(check('position'));
import Route from "../../models/route.model.js";
import {logger} from '../../utils/logger.js'

const validateRoute = async (route_id) => {
    const route = await Route.findByPk(route_id);
    if(route == null){
        const error = new Error("Route not found"); 
        logger.error(error.message);
        throw error;
    }
    return route;
}

export const validateUserPreferenceBody = [ 
    check("position.*").isInt().withMessage("Position points must be int."),
    check('position')
    .custom(async (value, {req}) =>{
        const route = await validateRoute(req.body.route_id);
        const map = await Map.findByPk(route.map_id);
        if (parseInt(value.x) > parseInt(map.dimensions.width) || parseInt(value.y) > parseInt(map.dimensions.height)) {
            const error = new Error(`Position exceeds Map dimensions. Please, don't exceed the follow dimensions: x:${map.dimensions.width}, y:${map.dimensions.height}`);
            logger.error(error.message);
            throw error;
        }

        if(parseInt(value.x) == route.start.x && parseInt(value.y) == route.start.y || parseInt(value.x) == route.end.x && parseInt(value.y) == route.end.y){
            const error = new Error(`You cannot enter a start o end route position`);
            logger.error(error.message);
            throw error;
        }
    }),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

export const validateWaypointsValues = [
    check('name').exists().notEmpty().withMessage("Waypoint must have a name"),
    positionValidator.validatePosition(async (route_id) => await Obstacle.findByPk(route_id), 'Waypoints', 'Obstacles'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

export const validateObstaclePosition = [
    positionValidator.validatePosition(async (route_id) => await Waypoint.findByPk(route_id), 'Obstacles', 'Waypoints'),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

