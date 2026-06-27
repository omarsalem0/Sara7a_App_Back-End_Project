import { Router } from "express";
import { successResponce } from "../../common/responce/success.responce.js";
import { getAccessToken, login, singup } from "./auth.service.js";
import { auth } from "../../common/middleware/auth/token.js";
const router=Router()

router.post('/singup',async(req,res)=>{
   let userData = await singup(req.body)
   successResponce({res,message:'user Added successfuly',data:userData,status:201})
})
router.post('/login',async(req,res)=>{
   let userData = await login(req.body,req.get("host"))
   successResponce({res,message:'user login successfuly',data:userData,status:200})
})
router.get('/get_RefreshToken',async(req,res)=>{
   let accessToken =await getAccessToken(req.headers.authorization,req.get("host"))
   successResponce({res,message:"genearate-AccessToken succesfuly",data:accessToken,status:200})
    
})

export default router 