import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/connection.js";
import cookieParser from "cookie-parser";
import allUserRoutes from "./Routes/allRoutes.js";
import cors from "cors"




dbConnection();

dotenv.config({
    path:".env"
})

const corsOptions={
    origin:"http://localhost:3000",
    credentials:true
}

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))


app.get("/",(req,res)=>{
res.send('helloooo')
})

app.use(allUserRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server is live on port number ${process.env.PORT}`)
})

