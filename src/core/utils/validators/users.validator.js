import { check } from "express-validator";
import { validateResult } from "./resultValidator.js"; 

export const validateCreateUser = [ 
    check('username')
    .exists()
    .not()
    .isEmpty()
    .custom((value, {req}) =>{ 
        if(value.length < 2) {
            const error = new Error("usernmae must be at least 2 characters lenght");
            logger.error(error.message);
            throw error;
        }
        return true
    }),
    
    check('email')
    .exists()
    .not()
    .isEmpty()
    .isEmail().withMessage("Please, enter a valid Email."),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]
