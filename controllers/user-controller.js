require('dotenv').config()
const { User } = require('../models')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')

class UserController {
    static async index (req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(response('success', 'success get users data', users))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async store (req, res) {
        try {
            req.body.data.password = await bcrypt.hash(req.body.data.password, parseInt(process.env.SALT_ROUND))
            const user = await User.create({ ...req.body.data })
            res.status(200).json(response('success', 'user created', user))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }    
}

module.exports = UserController
