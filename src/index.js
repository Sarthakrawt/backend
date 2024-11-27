import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import dotenv from 'dotenv'
import { app } from "./app.js";
// by using mongoose we can connect DB
// when you are working with database 
// you have to use async await 
import connectDB from "./db/index.js";

dotenv.config({
    path: '.env'
})
// connectDB();
// require('dotenv').config({path: './env'})


connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running on port : ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("Mongo Db connection failed", err);
  
})
// import express from "express"
// const app = express()
// ;(async ()=>{
//     try{
//       await mongoose.connect(`${process.env.MONGODB_URI}`)
// app.on listener is just used when your server have some issue 
//       app.on('error', (error)=>{
//         console.log("Error", error);
//         throw error
//       })
//       app.listen(process.env.PORT , ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`)
//       })
//     }catch(error){
//         console.error("Error", error)
//     }
// })()
