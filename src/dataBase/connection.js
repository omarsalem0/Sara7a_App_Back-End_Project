import mongoose from "mongoose";
import { env } from "../../config/env.service.js";
export const dataBaseConnection=()=>{
    mongoose.connect(env.dataBaseUrl).then(()=>{
        console.log("data Base is conttected");
        
    }).catch((err)=>{
        console.log("error conection",err);
        
    })
}