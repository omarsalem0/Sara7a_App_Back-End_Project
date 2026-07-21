import { generateAccessToken, generateToken } from "../../common/middleware/auth/token.js";
import { hashData, verifyData } from "../../common/middleware/secuirty/encryption.js";
import { badRequestException, conflictException, notFoundExcepetion } from "../../common/responce/error.responce.js";
import { userModel } from "../../dataBase/model/user.model.js";
import {sendEmail} from "../../common/utils/sendEmail.js"
import { creatRevokToken, del, get, set } from "../../dataBase/redis.service.js";
import {OAuth2Client} from "google-auth-library"
import { env } from "../../../config/env.service.js";
export const singup =async(data)=>{
    if(!data) {
       badRequestException ({
        message:'no data send or data not complete'})}
    let{name,email,password,uniqueAccessName}=data    
    let existUser =await userModel.findOne({email})
    if(existUser) {
        conflictException({message:'user already exist '})
    }

    let hashPassword =await hashData(password)
    let otp =Math.floor(10000+Math.random()*900000)
    let hashOtp=await hashData(toString(otp))
    let addedUser =await userModel.insertOne({name,email,password:hashPassword,uniqueAccessName})
    await set({
        key:`otp:${addedUser._id}`,
        value:hashOtp,
        ttl:60*5
    })
    await sendEmail({
        to:email,
        subject:'verfiy your account',
        html:`the otp is ${otp}`
    })
    return addedUser

}

export const singupMail =async(data)=>{ 
   let client =new OAuth2Client()
   let ticket =await client.verifyIdToken({
    idToken:data.idToken,
    audience:env.client_Id
   })
   console.log(ticket);
   
   let payload= ticket.getPayload()
   console.log(payload);
   
   if(!payload.email_verified ){
      badRequestException({
        message:'email is not verify'
      })
   }
   let {name,email}=payload
   let existEmail=await userModel.findOne({email})
   if (existEmail) {
    conflictException({
        message:'email already exist'
    })
   }
   let addedUser=await userModel.insertOne({name,email,provider:'google'})
   if (addedUser) {
    return "user added successfuly"
   } else {
    return 'user not added'
   }

}
export const verifyAccount =async(data)=>{
    if(!data) badRequestException({message:'data is not found'})
    let{email,otp}=data
    let existUser =await userModel.findOne({email})
    if(!existUser) notFoundExcepetion ({message:'email not found'})
    let hashOtp =await get(`otp:${existUser._id}`)
    if (!hashOtp) {
        badRequestException({
            message: "OTP expired or not found"
        });
    }
    let verfiyOtp =await verifyData(toString(otp),hashOtp)  
    if(verfiyOtp){
        existUser.isverify=true
        await del(`otp:${existUser._id}`)
       await existUser.save()
        return existUser
    }else{
        badRequestException({message:'otp is not matched or email already verify'})
    }       

}

export const login =async(data,host)=>{
     if(!data) {
       badRequestException ({
        message:'no data send or data not complete'})}
    let{email,password}=data
    let existUser =await userModel.findOne({email,isverify:true})
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
export const logOut =async(req)=>{
    let redisKey=await creatRevokToken({userID:req.userID,token:req.token})
    await set({
        key:redisKey,
        value:1,
        ttl:req.decoded.iat+ 30*60
    })
    return {message:'logout successful'}
}
