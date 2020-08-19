const config = require('../config/nodemailer')
const nodemailer = require('nodemailer')

const sendEmail = async (payload) => {
    const transporter = await nodemailer.createTransport(config)

    const mail = {
        to: payload.email,
        from: config.auth.user,
        subject: payload.subject,
        attachments: [
            {
                filename: new Date() + '_data.pdf',
                path: payload.pdf
            }
        ]
    }

    transporter.sendMail(mail)
}

module.exports = sendEmail
