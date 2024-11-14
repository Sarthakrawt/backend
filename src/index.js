import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import dotenv from 'dotenv'
// by using mongoose we can connect DB
// when you are working with database 
// you have to use async await 
// import connectDB from "./db/index.js";
dotenv.config({
    path: '.env'
})
// connectDB();
// require('dotenv').config({path: './env'})



import express from "express"
const app = express()
;(async ()=>{
    try{
      await mongoose.connect(`${process.env.MONGODB_URI}`)
      app.on('error', (error)=>{
        console.log("Error", error);
        throw error
      })
      app.listen(process.env.PORT , ()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
      })
    }catch(error){
        console.error("Error", error)
    }
})()