import { Router } from "express";
import { createMap, getMap, updateMap, deleteMap} from "../controllers/map.controller.js";
import { validateBody } from "../../core/utils/validators/map.validator.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
const mapRoutes = Router();
mapRoutes.post('/',validateBody,createMap);
mapRoutes.get('/:id', cacheMiddleware(cacheConfig),getMap); 
mapRoutes.put('/:id', validateBody,updateMap);
mapRoutes.delete('/:id', deleteMap)
export default mapRoutes;