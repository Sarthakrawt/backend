import mongoose from "mongoose";
import bcrypt from "bcrypt"


const UserSchema =  new mongoose.Schema({
    username:{
        type : String,
        require: true,
        unique: true,
        lowercase: true,
        trim : true,
        index: true
    },
    email: {
        type: String,
        require : true,
        unique: true,
        trim: true,
        index: true
    },
    avatar : {
        type: String,
        require: true,
    },
    coverImage: {
        type: String,

    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type: String,
        require: [true, "password is required"]
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
}) 
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        return next();
    }
this.password = await bcrypt.hash(this.password, 10)
next()
})
UserSchema.methods.isPasswordCorrect = async function (password){
   return  await bcrypt.compare(password, this.password);
}

//jwt 
// jwt is a bearer token it's like a key which have this key they can access it 
UserSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expriresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// sign is use to generate tokens 
UserSchema.methods.generateRefreshToken = function(){
 return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expriresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', UserSchema);