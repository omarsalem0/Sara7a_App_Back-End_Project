import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.resolve('./config/.env')})
const port=process.env.PORT
const dataBaseUrl=process.env.DATABASEURL
const mood=process.env.MOOD
const saltRound=process.env.SALTROUND
const userSignature=process.env.USER_SIGNATURE
const adminSignature=process.env.ADMIN_SIGNATURE
const refreshUserToken =process.env.REFRESH_USER_TOKEN
const RefreshAdminToken =process.env.REFRESH_ADMIN_TOKEN
const googleEmail =process.env.GOOGLE_ACOUNCT_EMAIL
const googleAppPassword= process.env.GOOGLE_APP_PASSWORD
const serverUrl=process.env.SERVER_URL
const redisUrl=process.env.REDIS_URL
const client_Id=process.env.CLIENT_ID
export const env ={
    port,
    dataBaseUrl,
    mood,
    saltRound,
    userSignature,
    adminSignature,
    refreshUserToken,
    RefreshAdminToken,
    googleEmail,
    googleAppPassword,
    serverUrl,
    redisUrl,
    client_Id
}