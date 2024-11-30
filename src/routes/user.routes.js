import { Router } from "express";
// Router is used to make routers like /api /about 
import {registerUser} from "../controllers/user.controller.js"
const router = Router()
// first to assign routers to router you need to use route method then if you router functionallity is in another folder you can use post and function name which is situated in differnet folder 
router.route("/register").post(registerUser)
export default router