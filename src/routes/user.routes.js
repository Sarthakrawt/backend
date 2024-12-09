import { Router } from "express";
// Router is used to make routers like /api /about 
import {registerUser, loginUser, logoutUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"
const router = Router()
// first to assign routers to router you need to use route method then if you router functionallity is in another folder you can use post and function name which is situated in differnet folder 

router.route("/register").post(
    upload.fields([
        {name : "avatar",
            maxCount: 1,
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(
    loginUser
)

// secured routes
router.route("/logout").post(
    verifyJWT,
    logoutUser
)
export default router