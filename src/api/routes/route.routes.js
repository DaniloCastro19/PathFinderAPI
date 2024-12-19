import { createRoute, getRoute, deleteRoute } from "../controllers/route.controller.js";
import { Router } from "express";
import { validateCreateRoute } from "../../core/utils/validators/route.validator.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
const routeRouter = Router();

routeRouter.post('/', validateCreateRoute, createRoute); 
routeRouter.get('/:id', cacheMiddleware(cacheConfig),getRoute);
routeRouter.delete('/:id', deleteRoute);

export default routeRouter;