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
const port = process.env.PORT || 4000;
const corsOptions={
    origin:"https://netflix-bo4v.onrender.com",
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


app.listen(port,()=>{
    console.log(`server is live on port number ${port}`)
})

