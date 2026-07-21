import { Router } from "express";
import {auth} from '../../common/middleware/auth/token.js'
import { findUserByAccessName, getUserData, updateProfile } from "./user.service.js";
import { successResponce } from "../../common/responce/success.responce.js";
import { upload } from "../../common/middleware/multer.js";

const router =Router()

router.get('/get-user',auth,async(req,res)=>{
    let userData=await getUserData(req.user)
    successResponce({res,message:'user data ',data:userData,status:200})

})
router.put('/update-profile',auth,upload().single('coverImage'),async(req,res)=>{
    let userData =await updateProfile(req.user,req.body,req.file)
    successResponce({res,message:'user updated successfuly',data:userData})

})
router.get('/get-data-by-uniqueAccessName/:uniqueAccessName',async(req,res)=>{
    let userData =await findUserByAccessName-(req.params.uniqueAccessName)
    successResponce({res,message:'data from uniqueAccessName ',data:userData})


})





export default router