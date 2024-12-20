import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
// with my server i can access the cookie of user browser and set mean i can do crud operation 
// server can remove and add cookies 
 const app = express();

app.use(cors({
    orgin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({
    limit : '50mb',
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
// to encode the url 
app.use(express.static("public"));
// for img or any other file which are in public any one can asses it 

app.use(cookieParser())


// routes
import userRouter from './routes/user.routes.js'

// routes declaration
// previously we are using .get to make router in the same file but now 
// you know that the file is in differnt folder so to use that router we use .use 
// it take two parameter first is router second is where i need to take the router 
app.use("/api/v1/users", userRouter)
// https://localhost:8000/api/v1/users/register so the users which you declare will add into the prefix 
export {app}