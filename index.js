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

const allowedOrigins = ['https://genuine-kashata-72954c.netlify.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow requests with no origin (like mobile apps or curl requests)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

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

