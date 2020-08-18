const { User } = require('../models')
const response = require('../helpers/response')

class UserController {
    static async index (req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(response('success', 'success get users data', users))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    
}

module.exports = UserController
