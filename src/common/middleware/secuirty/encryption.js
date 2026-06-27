import bcrypt from "bcrypt"
import { env } from "../../../../config/env.service.js"

export const hashData =async(data)=>{
    let hashedData = await bcrypt.hash(data,+env.saltRound)
    return hashedData

}

export const verifyData =async(plainText,sypherText)=>{
    let verify= await bcrypt.compare(plainText,sypherText)
    return verify
}