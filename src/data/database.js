import {Sequelize} from 'sequelize';
import config from '../data/config.js';
import { logger } from "../core/utils/logger.js";

export const sequalize = new Sequelize(config.db.database, config.db.user, config.db.password,{
    host: config.db.host,
    dialect: config.db.dialect, 
    port: config.db.port,
    define: {timestamps: false},
    logging:false
});

async function testConnection(){
    try{
        await sequalize.authenticate();
        logger.info("Succesfull connection with database.");
    }catch(err){   
        console.error(err);
    };
};

testConnection();