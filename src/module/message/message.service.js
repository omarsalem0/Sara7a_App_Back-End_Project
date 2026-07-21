import { env } from "../../../config/env.service.js"
import { badRequestException, notFoundExcepetion } from "../../common/responce/error.responce.js"
import { messageModel } from "../../dataBase/model/message.model.js"
import { userModel } from "../../dataBase/model/user.model.js"

export const sendMessage =async(data,file)=>{
    let {contant,reseverId}=data
    let existedUser =await userModel.findById(reseverId)
    if(!existedUser){
      notFoundExcepetion({
        message:'user not found'
      })
    }
    let imageField=''
    if(file){
        imageField=`${env.serverUrl}/${file.path}`
    }
    let addedMessage =await messageModel.insertOne({contant,reseverId,image:imageField})
    if (addedMessage) {
        return addedMessage
   }
   badRequestException({
    message:"something went wrong"
   })
 }

export const getAllMessage=async(userID)=>{
    let existedUser=await messageModel.find({reseverId:userID}).populate("reseverId", "name uniqueAccessName")
    if(existedUser.length==0){
         notFoundExcepetion({
            message:'user or message is not found'
         })
    }
    return existedUser
}
export const deleteMessage =async(messageId,userId)=>{
    let deletedMessage=await messageModel.deleteOne({
        _id:messageId,
        reseverId:userId
    })    
    if (deletedMessage.acknowledged=true && deletedMessage.deletedCount>=1) {
        return 'message deleted successfily'
    } else {
        badRequestException ({
            message:'message is not found or you are not the owner'
        })
    }

}