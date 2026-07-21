import { env } from "../../../config/env.service.js"

export const erorrResponce =({
    message="somthing went wrong",
    extra =undefined,
    status=400
}={})=>{
 throw new Error (message,{cause:{status,extra}})
}


export const badRequestException=({message='Bad request',extra=undefined}={})=>{
    return erorrResponce({message,extra,status:400})
}
export const unauthorizedExcepetion =({message='Unauthorized',extra=undefined}={})=>{
   return erorrResponce({message,extra,status:401})
}
export const forbiddenExcepetion =({message='Forbidden',extra=undefined}={})=>{
   return erorrResponce({message,extra,status:403})
}
export const notFoundExcepetion =({message='not Found',extra=undefined}={})=>{
   return erorrResponce({message,extra,status:404})
}
export const conflictException=({message='Conflict',extra}={})=>{
    return erorrResponce({message,extra,status:409})
}
export const globalHandelError=(err,req,res,next)=>{
    const mood= env.mood=='dev'
    const deafultMessage='somthing went wrong'
    const displayMessage =err.message || deafultMessage
    const status = err.status? err.status :err.cause? err.cause.status :500
    res.status(status).json({
        stack: mood? err.stack :null,
        message: mood? displayMessage :deafultMessage,
        extra:mood? err.cause :null
    })

}