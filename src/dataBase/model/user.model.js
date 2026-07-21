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
        required:function(){
            return this.provider==='system'
        }
    },
    coverImage:{
        type:String
    },
    profilePicture:{
        type:String
    },
    uniqueAccessName:{
        type:String,
        unique:true,
        required:function(){
        return this.provider==='system'
        }
    },
    role:{
        type:Number,
        default:0
    },
    isverify:{
        type:Boolean,
        default:false
    },
    provider:{
        type:String,
        enum:['google','system'],
        default:'system'
    }

})

export const userModel= model('User',userSckema)