require('dotenv').config()

module.exports = {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.AUTH_EMAIL_USER,
        pass: process.env.AUTH_EMAIL_PASSWORD
    }
}