import mongoose from "mongoose";
import bcrypt from "bcrypt"


const UserSchema =  new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
        index: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
        trim: true,
        index: true
    },
    avatar : {
        type: String,
        required: true,
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
        required: [true, "password is required"]
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
this.password = bcrypt.hash(this.password, 10)
next()
})
UserSchema.methods.isPasswordCorrect = async function (password){
   return  await bcrypt.compare(password, this.password);
}

//jwt 
UserSchema.methods.generateAccessToken = function(){
    jwt.sign(
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
UserSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expriresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', UserSchema);