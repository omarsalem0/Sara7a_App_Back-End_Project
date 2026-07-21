import { client } from "./redis.js";

export const set =async({key,value,ttl})=>{
    return await client.set(key,value,{EX:ttl})
}
export const get =async(key)=>{
return await client.get(key)
}
export const mGet=async(...keys)=>{
    return client.mGet(keys)
}
export const del=async(key)=>{
    return await client.del(key)
}
export const ttl=async(key)=>{
    return await client.ttl(key)
}
export const creatRevokToken=({userID,token})=>{
    return `revokToken:${userID}:${token}`
}