import { Client } from "pg";
import dotenv from 'dotenv';
dotenv.config();

   export const client = new Client({
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT as any,
        password: process.env.PASSWORD,
        database: process.env.DB,
    })


