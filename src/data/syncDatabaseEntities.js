import { sequalize } from "./database.js";
import { logger } from "../core/utils/logger.js";
export const syncDatabaseEntities = async () =>{
    try{
        await sequalize.sync({force:true});
        logger.info("All models were synchronized succesfully");
    }catch(error){
        logger.error(error.message);
    }
}