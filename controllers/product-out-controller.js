const { ProductOut, Product, User } = require('../models')
const response = require('../helpers/response')
const getPagination = require('../helpers/pagination')

class ProductOutController {
    static async index (req, res) {
        try {
            const pagination = await getPagination({
                limit: req.query.limit,
                page: req.query.page,
                total: await ProductOut.count()
            })
    
            const productOut = await ProductOut.findAll({
                include: [
                    { model: Product, as: 'product' }
                ]
            })
    
            const data = {
                data: productOut,
                ...pagination.data
            }
    
            res.status(200).json(response('success', 'data fetched', { data }))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async store (req, res) {
        try {
            const updateProductStock = await Product.findByPk(req.body.data.productId)
            if(updateProductStock.stock < req.body.data.total) {
                res.status(400).json(response('fail', 'not enough product stock, please check current product'))
            }
            updateProductStock.stock -= req.body.data.total
            await updateProductStock.save()
            const productOut = await ProductOut.create({ ...req.body.data })
            res.status(201).json(response('success', 'data created', productOut))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async update (req, res) {
        try {
            const { date, total, productId } = req.body.data
            const productOut = await ProductOut.findByPk(req.params.id)
            const updateProductStock = await Product.findByPk(req.body.data.productId)
            if(total > productOut.total) {
                const n = (updateProductStock.stock + productOut.total) - total
                if(updateProductStock.stock - n > 0) {
                    updateProductStock.stock = n
                } else {
                    res.status(400).json(response('fail', 'please check product stock'))
                }
            }
            await updateProductStock.save()
            productOut.date = date
            productOut.productId = productId
            productOut.total = total
            await productOut.save()
            res.status(200).json(response('success', 'data updated', productOut))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async show(req, res) {
        try {
            const productOut = await ProductOut.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    { model: Product, as: 'product', include: [ { model: User, as: 'supplier' } ] }
                ]
            })
            if (!productOut) res.status(404).json(response('fail', 'data not found'))
            res.status(200).json(response('success', 'get data by id', productOut))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async destroy (req, res) {
        try {
            const productOut = await ProductOut.findByPk(req.params.id)
            if(!productOut) res.status(404).json(response('fail', 'data not found'))
            await ProductOut.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(response('success', 'data deleted'))
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ProductOutController
