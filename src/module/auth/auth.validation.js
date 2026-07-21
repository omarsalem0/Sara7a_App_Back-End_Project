import joi from "joi"

export const singupSckema =joi.object({
        name:joi.string().required().min(3).max(30),
        email:joi.string().email().required(),
        password:joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        phone:joi.string().optional(),
        uniqueAccessName:joi.string().required()

    })

export const loginSckema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
   }) 
