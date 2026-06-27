export const successResponce =({
    res,
    message="done",
    data=undefined,
    status=200
}={})=>{
 res.status(status).json({message,data})
}