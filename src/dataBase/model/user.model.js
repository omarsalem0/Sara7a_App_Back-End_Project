import mongoose ,{model, Schema} from "mongoose"

const userSckema = new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    coverImage:{
        type:String
    },
    profilePicture:{
        type:String
    },
    uniqueAccessName:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:Number,
        default:0
    }

})

export const userModel= model('user',userSckema)