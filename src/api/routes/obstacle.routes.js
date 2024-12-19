import { Router } from "express";
import { createObstacle, getObstacle , updateObstacle, deleteObstacle} from "../controllers/obstacle.controller.js";
import { validateUserPreferenceBody, validateObstaclePosition } from "../../core/utils/validators/userPreferences.validator.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
const obstacleRoutes = Router();

obstacleRoutes.post('/',validateUserPreferenceBody, validateObstaclePosition,createObstacle);
obstacleRoutes.get('/:id',cacheMiddleware(cacheConfig),getObstacle);
obstacleRoutes.put('/:id', validateUserPreferenceBody,validateObstaclePosition,updateObstacle);
obstacleRoutes.delete('/:id', deleteObstacle);

export default obstacleRoutes;