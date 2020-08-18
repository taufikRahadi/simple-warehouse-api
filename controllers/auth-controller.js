require('dotenv').config()
const { User } = require('../models')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
    static async signup (req, res) {
        try {
            req.body.data.password = await bcrypt.hash(req.body.data.password, parseInt(process.env.SALT_ROUND))
            const user = await User.create({ ...req.body.data })
            res.status(200).json(response('success', 'user created', user))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async login (req, res) {
        // res.json(req.body.data)
        try {
            const user = await User.scope('withPassword').findOne({
                where: {
                    username: req.body.data.username,
                }
            })
    
            if (!user) return res.status(401).json(response('fail', 'username not found'))
            const compare = bcrypt.compareSync(req.body.data.password, user.password)
            if(!compare) res.status(401).json(response('fail', 'wrong password'))

            const token = jwt.sign(user.username, process.env.JWT_SECRET)
            res.status(200).json(response('success', 'login success', { token }))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }
}

module.exports = AuthController
