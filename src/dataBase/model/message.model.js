import mongoose,{model, Schema} from "mongoose";

const messageSkema = new Schema({
    contant:{
        type:String,
        require:true
    },
    reseverId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    image:{
        type:String
    }

})

export const messageModel =model ('message',messageSkema)