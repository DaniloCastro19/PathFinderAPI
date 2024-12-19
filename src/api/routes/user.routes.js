import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { validateCreateUser } from "../../core/utils/validators/users.validator.js";
import cacheMiddleware from "../middlewares/cache.js";
import {cacheConfig} from "../../core/utils/cacheConfig.js";
const userRoutes = Router();

userRoutes.post('/', validateCreateUser ,createUser);

userRoutes.get('/:id',cacheMiddleware(cacheConfig), getUser);

userRoutes.put('/:id', updateUser); 

userRoutes.delete('/:id', deleteUser);

export default userRoutes;