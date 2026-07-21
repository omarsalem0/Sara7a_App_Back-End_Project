import nodemailer from "nodemailer"
import { env } from "../../../config/env.service.js"

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:env.googleEmail,
        pass:env.googleAppPassword
    }
})

export const sendEmail =({to,subject,html})=>{
  const info =transporter.sendMail({
    from:`omar Salem ${env.googleEmail}`,
    to,
    subject,
    html
  })
}