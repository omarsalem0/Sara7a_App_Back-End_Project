import joi from "joi"
import { badRequestException } from "../responce/error.responce.js"

export const validation =(Schema)=>{
    return (req,res,next)=>{
        let {value,error}=Schema.validate(req.body,{abortEarly:false})
        console.log(value,error);
        if(error) {
            badRequestException({message:'validation error',extra:error})

        }
        next()

    }

}