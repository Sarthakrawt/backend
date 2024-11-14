import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db";
const app = express()
dotenvdotsample.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("Mongo db connection failed !!! ", err);
})