import { Router } from "express";
import { getRequestStats, getResponseTimes, getStatusCodes, getPopularEndpoints} from "../controllers/stats.controller.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
const statsRoutes = Router();

statsRoutes.get('/requests', cacheMiddleware(cacheConfig),getRequestStats);
statsRoutes.get('/response-time', cacheMiddleware(cacheConfig), getResponseTimes);
statsRoutes.get('/status-codes', cacheMiddleware(cacheConfig), getStatusCodes);
statsRoutes.get('/popular-endpoints', cacheMiddleware(cacheConfig), getPopularEndpoints);

export default statsRoutes;