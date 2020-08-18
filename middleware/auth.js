require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const response = require('../helpers/response')

module.exports = async (req, res, next) => {
    if (!req.headers['authorization']) res.status(401).json(response('fail', 'unauthenticated'))

    const token = req.headers['authorization'].split(' ')[1]
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (verify) {
            req.token = token
            req.username = jwt.decode(token, process.env.JWT_SECRET)
            return next()
        }
    } catch (error) {
        return res.status(500).json(response('fail', 'invalid token'))
    }
}