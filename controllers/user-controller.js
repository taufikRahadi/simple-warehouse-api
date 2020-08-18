require('dotenv').config()
const { User } = require('../models')
const response = require('../helpers/response')
const bcrypt = require('bcrypt')
const getPagination = require('../helpers/pagination')

class UserController {
    static async index (req, res) {
        const pagination = await getPagination({
            limit: req.query.limit,
            page: req.query.page,
            total: await User.count(),
        })
        try {
            const users = await User.findAll({
                offset: pagination.page,
                limit: pagination.limit,
                subQuery: false
            })
            const data = { data: users, ...pagination.data }
            res.status(200).json(response('success', 'success get users data', { data }))
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

    static async update (req, res) {
        try {
            const pass = req.body.data.password
            if(pass) req.body.data.password = await bcrypt.hash(pass, parseInt(process.env.SALT_ROUND))
            const { username, email, password, fullname, role } = req.body.data
            const user = await User.findOne({
                where: { id: req.params.id }
            })
            user.username = username
            user.email = email
            user.password = password
            user.fullname = fullname
            user.role = role
            await user.save()
            res.status(200).json(response('success', 'user updated', user))
        } catch (err) {
            console.log({ err })
            res.status(500).json(response('fail', err.message))
        }
    }

    static async show (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!user) return res.status(404).json(response('fail', 'user not found'))
            res.status(200).json(response('success', 'get user by id', user))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }

    static async destroy (req, res) {
        try {
            const user = await User.findByPk(req.params.id)
            if (!user) return res.status(404).json(response('fail', 'user not found'))
            await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(response('success', 'user deleted'))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = UserController
