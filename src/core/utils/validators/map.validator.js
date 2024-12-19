import { body, check } from "express-validator";
import { validateResult } from "./resultValidator.js"; 
import {logger} from '../../utils/logger.js'
export const validateBody =[
    
    check("name").notEmpty().withMessage("name field cannot be empty."),
    check("name").isString().withMessage("name should be a string"),

    check("dimensions").notEmpty().withMessage("dimensions field cannot be empty."),

    body("dimensions").custom((value) =>{
        if(!(value.hasOwnProperty('width') && value.hasOwnProperty('height'))){
            const error = new Error('A dimension should have width and height properties.');
            logger.error(error.message);
            throw error;
        }
        return true;
    }),

    body("dimensions.*").isInt().withMessage("Width and height must be int"),

    (req,res,next) => {
        
        validateResult(req,res,next)
    }

]
