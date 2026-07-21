import { Router } from "express";
import { deleteMessage, getAllMessage, sendMessage } from "./message.service.js";
import { upload } from "../../common/middleware/multer.js";
import { successResponce } from "../../common/responce/success.responce.js";
import { auth } from "../../common/middleware/auth/token.js";
const router =Router()


router.post('/send-message',upload().single('Image'),async(req,res)=>{
    let messageData=await sendMessage(req.body,req.file)
    successResponce({res,message:'message added successfuly',data:messageData})
    
})
router.get('/get-all-message',auth,async(req,res)=>{
   let userData=await getAllMessage(req.user)
    successResponce({res,message:'get all message successfuly',data:userData})
})
router.delete('/delete-message/:messageId',auth,async(req,res)=>{
    console.log(req.params.messageId,req.user);
    
    let data = await deleteMessage(req.params.messageId,req.user)
    successResponce({res ,message:'message deleted successfuly',data})
})


export default router