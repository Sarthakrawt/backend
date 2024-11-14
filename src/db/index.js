import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async()=>{
    try{
       
    console.log(`\n mongodb connected !! DB HOST ${ await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)}`)
    }catch(error){
        console.log("MONGODB connection error", error);
        process.exit(1)      
    }
}
export default connectDB;