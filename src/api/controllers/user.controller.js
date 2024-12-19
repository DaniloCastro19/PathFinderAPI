import UserService from "../../core/services/user.service.js";
const userService = new UserService();
import { ENTITY_NOT_FOUND } from "../../core/utils/customError.js";
import UserDTO from "../DTOs/user.dto.js";
import { logger } from "../../core/utils/logger.js";
export const createUser = async (req, res, next) => { 
    try{
        const user = await userService.createEntity(req.body);
        const userDto = new UserDTO(user);
        return res.status(201).json(userDto);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
};

export const getUser = async (req, res, next) => { 
    try{
        const user = await userService.getEntity(req.params.id);
        if(!user){throw ENTITY_NOT_FOUND('User')}
        const userDto = new UserDTO(user);
        return res.json(userDto);
    }catch(error){
        logger.error(error.message);
        next(error);
    };
};

export const updateUser = async (req, res, next) => { 
    try{
        const user = await userService.updateEntity(req.params.id, req.body);
        if(!user){throw ENTITY_NOT_FOUND('User')}
        return res.json({message:'User updated succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
};

export const deleteUser = async (req, res, next) => { 
    try{
        const wasDeleted = await userService.deleteEntity(req.params.id);
        if(!wasDeleted){throw ENTITY_NOT_FOUND('User')}
        
        return res.json({message:'User deleted succesfully.'});
    }catch(error){
        logger.error(error.message);
        next(error);
    };
};