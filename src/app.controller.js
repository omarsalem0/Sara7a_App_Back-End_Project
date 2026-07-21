import express from "express"
import { env } from "../config/env.service.js"
import { dataBaseConnection } from "./dataBase/connection.js"
import { globalHandelError } from "./common/responce/error.responce.js"
import authRouter from './module/auth/auth.controller.js'
import userRouter from './module/user/user.controller.js'
import messageRouter from './module/message/message.controller.js'
import path from "path"
import { fileURLToPath } from "url"
import { redisConnection } from "./dataBase/redis.js"
import cors from "cors"
export const bootStarp =async()=>{
    const app =express()
    app.use(express.json())
    app.use(cors(
        {origin: '*'}
    ))
    dataBaseConnection()
    redisConnection()
    let __filename =fileURLToPath(import.meta.url)
    let __dirname =path.dirname(__filename)
    console.log(__filename,__dirname);
    console.log(path.join(__dirname,'../uploads'));
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/message',messageRouter)
    app.use('/uploads',express.static(path.join(__dirname,'../uploads')))
    app.use('{*dummy}',(req,res)=>{
        res.json({message:'url not found'})
        
    })
    app.use(globalHandelError)
    app.listen(env.port,()=>{
        console.log(` server is running as port ${env.port}`);
        
    })
    


}

