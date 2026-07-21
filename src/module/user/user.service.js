import { env } from "../../../config/env.service.js"
import { hashData, verifyData } from "../../common/middleware/secuirty/encryption.js"
import { badRequestException, conflictException, notFoundExcepetion } from "../../common/responce/error.responce.js"
import { userModel } from "../../dataBase/model/user.model.js"


export const getUserData =async(userID)=>{
    let userData =await userModel.findById(userID)
    if(!userData){
    notFoundExcepetion ({
        message : 'user not found'
    })}
    return userData

} 
export const updateProfile =async(userId,data,file)=>{
    let {uniqueAccessName,password,newPassword}=data
    let imageField=''
    if(file){
      imageField= `${env.serverUrl}/${file.path}`
      console.log(imageField);
    }else{
        badRequestException({
            message:'file is not upload successfly'
        })
    }
    let existUser =await userModel.findOne({_id:userId,isverify:true})
    if(!existUser) notFoundExcepetion({message:'user not found'})
    if(existUser.uniqueAccessName==uniqueAccessName) {
        conflictException({message:'uniqueAsseccName allready exist'})
    }    
    console.log(password,existUser.password);
    
    let comparedPassword =await verifyData(password,existUser.password)
    let hashNewPassword=''
    if(comparedPassword){
        hashNewPassword=await hashData(newPassword)
        existUser.password=hashNewPassword
        existUser.profilePicture=imageField
        await existUser.save()
        return existUser

    }else{
        badRequestException({
            message:'invalid password'
        })
    }

}
export const findUserByAccessName =async(uniqueAccessName)=>{
    let existedUser =await userModel.findOne({uniqueAccessName})
    if (!existedUser) {
        notFoundExcepetion({
            message:'uniqueAccessName is not found'
        })
    } 
    return existedUser  
}

