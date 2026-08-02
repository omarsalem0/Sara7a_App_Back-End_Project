import { Router } from "express";
import { successResponce } from "../../common/responce/success.responce.js";
import { getAccessToken, login, logOut, singup, singupMail, verifyAccount } from "./auth.service.js";
import { auth } from "../../common/middleware/auth/token.js";
import { validation } from "../../common/middleware/validation.js";
import { loginSckema, singupSckema } from "./auth.validation.js";
import { loginLimiter } from "../../common/middleware/rateLimit/login.limiter.js";
const router=Router()

router.post('/singup',validation(singupSckema),async(req,res)=>{
   let signUpUser = await singup(req.body)
   successResponce({res,message:'user Added successfuly',data:signUpUser,status:201})
})
router.post('/google-login',async (req,res) => {
   console.log(req.body);
   
   let userSingup =await singupMail(req.body)
   successResponce({res,message:'user Added successfuly',data:signUpUser,status:201})
})
router.post('/verify-account',async(req,res)=>{
   let verfiyUser =await verifyAccount(req.body)
   successResponce({res,message:'verify Account',data:verfiyUser})
})
router.post('/login',loginLimiter,validation(loginSckema),async(req,res)=>{
   let loginUser = await login(req.body,req.get("host"))
   successResponce({res,message:'user login successfuly',data:loginUser,status:200})
})
router.get('/get_RefreshToken',async(req,res)=>{
   let accessToken =await getAccessToken(req.headers.authorization,req.get("host"))
   successResponce({res,message:"genearate-AccessToken succesfuly",data:accessToken,status:200})
    
})
router.post('/logout',auth,async(req,res)=>{
   let logOutUser =await logOut(req)
    successResponce({res,message:'user logOut successfuly',data:logOutUser,status:200})
})
export default router 