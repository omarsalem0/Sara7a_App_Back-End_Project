import { createClient } from "redis"
import { env } from "../../config/env.service.js";

export const client = createClient({
  url:env.redisUrl
});
 export const redisConnection =async()=>{

    try {
         client.on("error", function(err) {
         throw err;
        })
        await client.connect()
        console.log("redis dataBase is conented successfuly");
        
    } catch (error) {
        throw error
        
    }
 }
