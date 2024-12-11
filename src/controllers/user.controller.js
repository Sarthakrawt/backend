import {asyncHandler} from '../utils/asyncHandler.js'
import{ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'


const generateAccessAndRefreshTokens = async(userId) => {
   try{
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
   await user.save({
      validateBeforeSave: false
   })
   return {accessToken, refreshToken}
   }
   catch(error){
 throw new ApiError(500, "Something went wrong while generating refresh and access token")
   }
}
const registerUser = asyncHandler(async(req , res) =>{
   // get user details from frontend 
   // as we know when we try to register we need user details 
   // you already define in the user.model.js
   // validation - if anything is empty 
   // check if user already exists form : username , email
   // files are present or not like avatar 
   // upload them to cloudinary 
   // create user object - create entry in db
   //remove password and refresh token field from response
   //check for user creation 
   //return response

   const {fullName, email, username, password} = req.body;
   // console.log(req.body)
   if(
      [fullName, email, username, password].some((field)=>
      field?.trim() ==="")
   ){
      throw new ApiError(400,"all fields are compalsary")
   }
   const existedUser =  await User.findOne({
      $or: [{ username },{ email }]
   })
   if(existedUser){
      throw new ApiError(409, "user with email or username already exists")
   }
    

   const avatarLocalPath = req.files?.avatar[0]?.path;
   // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length > 0){
      coverImageLocalPath = req.files.coverImage[0].path;
    }
   // console.log(req.files);
   if(!avatarLocalPath){
      throw new ApiError(400, "Avatar file is required");}
 console.log(avatarLocalPath);
      const avatar = await uploadOnCloudinary(avatarLocalPath)
      console.log(avatar);
      const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
      if(!avatar){
       throw  new ApiError(400, "Avatar file is requierd")
      }
       const user = await User.create({
         fullName,
         avatar:avatar?.url,
         coverImage:coverImage?.url || "",
         email,
         password,
         username: username.toLowerCase(),
      })
      const createdUser = await User.findById(user._id).select(
       "-password -refreshToken"
      )
      if(!createdUser){
         throw new ApiError(500, "Something went wrong while registering a user")
      }
      return res.status(201).json(
         new ApiResponse(200, createdUser, "user registered successfully")
      )
    
   });

   const loginUser = asyncHandler(async(req, res)=>{
// req body => data
// username or email
// find username 
// password check
// access and refresh token
// send cookie
const {username ,email, password}= req.body;
if(!(username || email)){
   throw new ApiError(400, "username or email is required");
}
console.log(req.body);
const user =  await User.findOne({
   $or: [{username},{email}]
})
// or operator check one if there is username otherwise take email
if(!user){
throw new ApiError(404, "user does not exist")
}
console.log(user);

 const isPasswordVaild = await user.isPasswordCorrect(password);
 console.log(isPasswordVaild)
if(!isPasswordVaild){
   throw new ApiError(401, "invalid user credentials ");
}
const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
const options = {
   httpOnly: true, 
   secure: true
}
// mean you can only modify the cookies in server that's it 
return res.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refreshToken, options)
.json(
   new ApiResponse(
      200,
      {
         user: loggedInUser,
         accessToken,
         refreshToken
      },
      "User logged in Successfully"
   )
)
   })

   const logoutUser = asyncHandler(async(req, res)=>{
      //res
     await User.findByIdAndUpdate(
         req.user._id, 
         {
            $set : {
               refreshToken: undefined
            }
         },
         {
            new: true
         }
      )
      const options = {
         httpOnly: true,
         secure: true
      }

      return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("options")
      .json(new ApiResponse(200, {}, "User logged Out" ))
   })
export {
   registerUser,
    loginUser,
    logoutUser
};