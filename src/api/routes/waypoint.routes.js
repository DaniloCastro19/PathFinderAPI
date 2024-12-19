import { Router } from "express";
import { createWaypoint, getWaypoint, updateWaypoint, deleteWaypoint} from "../controllers/waypoint.controller.js";
import {validateUserPreferenceBody, validateWaypointsValues}from "../../core/utils/validators/userPreferences.validator.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
const waypointRouter = Router();

waypointRouter.post('/', validateWaypointsValues, validateUserPreferenceBody, createWaypoint);
waypointRouter.get('/:id' ,cacheMiddleware(cacheConfig), getWaypoint);
waypointRouter.put('/:id',validateWaypointsValues,validateUserPreferenceBody ,updateWaypoint);
waypointRouter.delete('/:id', deleteWaypoint);
export default waypointRouter;