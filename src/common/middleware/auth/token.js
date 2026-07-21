import jwt from "jsonwebtoken"
import { env } from "../../../../config/env.service.js"

export const auth =async(req,rse,next)=>{
    let {authorization}=req.headers    
    let [flag,token] = authorization.split(" ")
    switch (flag) {
        case "Bearer":
            let decodeData =await jwt.decode(token)
            let signature=""
            switch (decodeData.aud[0]) {
                case 0:
                    signature=env.userSignature
                    break;
                case 1:
                    signature=env.adminSignature
                default:
                    break;
            }
            let decoded =await jwt.verify(token,signature)
            req.user=decoded.userId
            req.decoded=decoded
            req.token=token
            next()
            break;
    
        default:
            break;
    }


}
export const generateToken =async(payload,role,host)=>{
    let signature=""
    let refreshSignature=""
    switch (role) {
        case 0:
            signature=env.userSignature
            refreshSignature=env.refreshUserToken
            break;
        case 1:
            signature=env.adminSignature    
            refreshSignature=env.RefreshAdminToken
        default:
            break;
    }
    let accessToken =await jwt.sign(payload,signature,
        {   expiresIn:'30mins',
            audience:[role],
            issuer:host
        }
    )
    let refreshToken =await jwt.sign(payload,refreshSignature,{
        expiresIn:"1y",
        audience:[role],
        issuer:host

    })
    return {accessToken,refreshToken}

}
export const generateAccessToken =async(refreshToken,host)=>{
    let decoded =jwt.decode(refreshToken)
    let signature=""
    switch (decoded.aud[0]) {
        case 0:
            signature=env.userSignature
            break;
        case 1:
            signature=env.adminSignature
        default:
            break;
    }
    let accessToken =await jwt.sign({userId:decoded.userId},signature,
        {
        expiresIn:'30mins',
        audience:[decoded.aud[0]],
        issuer:host
    })
    return accessToken

}