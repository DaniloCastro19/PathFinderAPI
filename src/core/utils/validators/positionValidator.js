import {logger} from '../../utils/logger.js'
export default class PositionValidator{
    constructor(value){ 
        this.value = value;
    }
/**
 * Validates a position against a custom validation function and compares it with another entity's position.
 *
 * @param {Function} customValidation - A custom validation function that takes a route ID and returns a related entity.
 * @param {string} validatedEntityName - The name of the entity being validated.
 * @param {string} comparedEntityName - The name of the entity with which the validated entity's position is being compared.
 * @returns {Function} - A function that performs the position validation.
 */
    validatePosition(customValidation, validatedEntityName, comparedEntityName){
        return this.value.custom(async (position, {req})=> {
            const relatedEntity = await customValidation(req.body.route_id);
            if(relatedEntity == null){
                return;
            }
            if(relatedEntity.position.x === position.x  && relatedEntity.position.y === position.y){
                const error = new Error(`${validatedEntityName} Position must be different from ${comparedEntityName} position.`);
                logger.error(error.message);
                throw error;
            }
        });
    }
}