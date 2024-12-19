import { createOptimalPath, getOptimalPath, deleteOptimalPath} from "../controllers/optimalPath.controller.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
import { Router } from "express";

const optimalPathRouter = Router();

optimalPathRouter.post('/', createOptimalPath);
optimalPathRouter.get('/:id',cacheMiddleware(cacheConfig),getOptimalPath);
optimalPathRouter.delete('/:id', deleteOptimalPath);

export default optimalPathRouter;