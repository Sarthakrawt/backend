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
    limit : '16kb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
// to encode the url 
app.use(express.static("public"));
// for img or any other file which are in public any one can asses it 

app.use(cookieParser())


export {app}