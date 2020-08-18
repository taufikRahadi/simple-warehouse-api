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
            res.status(201).json(response('succcess', 'product created', product))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async update (req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            if(req.file) { 
                req.body.photo = req.file.path
                product.photo = req.body.photo
            }
            const { name, stock, price, userId } = req.body
            if (!product) return res.status(404).json(response('success', 'product not found'))
            product.name = name
            product.stock = stock
            product.price = price
            product.userId = userId
            await product.save()
            res.status(200).json(response('success', 'product update', product))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async show (req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    { model: User, as: 'supplier' }
                ]
            })

            if(!product) return res.status(404).json(response('fail', 'product not found'))
            res.status(200).json(response('success', 'get product by id', product))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async destroy (req, res) {
        try {
            const product = await Product.findByPk(req.params.id)
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(response('success', 'product deleted'))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }
}

module.exports = ProductController
