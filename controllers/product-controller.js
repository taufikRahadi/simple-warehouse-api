const { Product, User } = require('../models')
const getPagination = require('../helpers/pagination')
const response = require('../helpers/response')

class ProductController {
    static async index (req, res) {
        try {
            const pagination = await getPagination({
                limit: req.query.limit,
                page: req.query.page,
                total: await Product.count()
            })
            const products = await Product.findAll({
                offset: pagination.page,
                limit: pagination.limit,
                subQuery: false,
                include: [
                    { model: User, as: 'supplier' }
                ]
            })
            const data = {
                products,
                ...pagination.data
            }
            res.status(200).json(response('success', 'get products data', { data }))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async store (req, res) {
        try {
            if(req.file) req.body.photo = req.file.path
            const product = await Product.create({ ...req.body })
            res.status(500).json(response('succcess', 'product created', product))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }
}

module.exports = ProductController
