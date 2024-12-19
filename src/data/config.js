import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT;
const config = {
    dev:{
        db:{
            database: DATABASE_NAME,
            user: DB_USER,
            password : DB_PASSWORD,
            host: DB_HOST,
            port: DB_PORT,
            dialect: DB_DIALECT
        }
    }
}

export default config[env];