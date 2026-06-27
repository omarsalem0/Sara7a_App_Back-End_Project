import { generateAccessToken, generateToken } from "../../common/middleware/auth/token.js";
import { hashData, verifyData } from "../../common/middleware/secuirty/encryption.js";
import { badRequestException, conflictException, notFoundExcepetion } from "../../common/responce/error.responce.js";
import { userModel } from "../../dataBase/model/user.model.js";

export const singup =async(data)=>{
    if(!data) {
       badRequestException ({
        message:'no data send or data not complete'})}
    let{name,email,password,uniqueAccessName}=data    
    let existUser =await userModel.findOne({email})
    if(existUser) {
        conflictException({message:'user already exist'})
    }
    let hashPassword =await hashData(password)
    let addedUser =await userModel.insertOne({name,email,password:hashPassword,uniqueAccessName})
    return addedUser

}
export const login =async(data,host)=>{
     if(!data) {
       badRequestException ({
        message:'no data send or data not complete'})}
    let{email,password}=data
    let existUser =await userModel.findOne({email})
    if(!existUser) {
       notFoundExcepetion({message:'user not found'})
    }
    let vaildPassword =await verifyData(password,existUser.password)
    if(!vaildPassword){
        badRequestException({message:"invild password"})
    }
    let {accessToken,refreshToken} =await generateToken({userId:existUser._id},existUser.role,host)    
    return {accessToken,refreshToken}

}
export const getAccessToken =async(authorization,host)=>{
    if(!authorization) badRequestException({message:"refreshToken is not difiend"})
    let accessToken=await generateAccessToken(authorization,host)
    return accessToken
}
