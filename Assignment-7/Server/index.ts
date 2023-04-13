import express , {Request , Response} from "express"
const app = express()
import "./DataBase/dbConfig"
import bodyParser from "body-parser"
import router from "./Routers/MainRouter"
import cors from "cors"

app.listen(8001 , () => {
    console.log("App is Listening on 8001")
})
 
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get("/" , (req:Request , res:Response ) => {
    res.send("TypeScript & Express Index.js")
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router)
