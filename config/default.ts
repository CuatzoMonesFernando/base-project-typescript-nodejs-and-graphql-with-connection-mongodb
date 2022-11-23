import * as dotenv from 'dotenv'
dotenv.config()

export default {
    dbUri: process.env.MONGO_CONNECT_DEV,
    host: process.env.HOST,
    port: process.env.PORT,
    environment: process.env.NODE_ENV,
    connectionDatabase: process.env.DATABASE_CONNECTION,
    dbHost: process.env.DB_PORT,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD
}