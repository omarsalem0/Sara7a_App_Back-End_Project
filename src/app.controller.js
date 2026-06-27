import express from "express"
import { env } from "../config/env.service.js"
import { dataBaseConnection } from "./dataBase/connection.js"
import { globalHandelError } from "./common/responce/error.responce.js"
import authRouter from './module/auth/auth.controller.js'
export const bootStarp =()=>{
    const app =express()
    app.use(express.json())
    dataBaseConnection()
   app.get('/check',(req,res)=>{
    res.json({message:'done'})
   })
    app.use('/auth',authRouter)
    app.use('{*dummy}',(req,res)=>{
        res.json({message:'url not found'})
    
    })
    app.use(globalHandelError)
    app.listen(env.port,()=>{
        console.log(` server is running as port ${env.port}`);
        
    })
    


}

