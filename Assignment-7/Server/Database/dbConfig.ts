import {Client} from "pg"
import dotenv from "dotenv"
dotenv.config()

export const conn = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT as any
});

conn.connect()

conn.query("select * from users" , (err , result) => {
    if (err) {
        console.log("Error in Db Connection")
    }
    else{
        console.log("DB Connected Successfully")
    }
})