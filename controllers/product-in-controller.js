const { ProductIn, Product, User } = require('../models')
const getPagination = require('../helpers/pagination')
const response = require('../helpers/response')

class ProductInController {
    static async index (req, res) {
        try {
            const pagination = await getPagination({
                limit: req.query.limit,
                page: req.query.page,
                total: await ProductIn.count()
            })
    
            const products = await ProductIn.findAll({
                include: [
                    { model: Product, as: 'product', include: [ { model: User, as: 'supplier' } ] }
                ]
            })
    
            const data = {
                data: products,
                ...pagination.data
            }
            res.status(200).json(response('success', 'fetch product in', { data }))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async store (req, res) {
        req.body.data.date = new Date(req.body.data.date)
        try {
            const productIn = await ProductIn.create({ ...req.body.data })
            const updateProductStock = await Product.findByPk(productIn.productId)
            updateProductStock.stock += parseInt(productIn.total)
            await updateProductStock.save()
            res.status(201).json(response('success', 'product in saved', productIn))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    static async update (req, res) {
        try {
            const { date, total, productId } = req.body.data
            const productIn = await ProductIn.findByPk(req.params.id)
            const product = await Product.findByPk(productIn.productId)
            product.stock = (parseInt(product.stock) - parseInt(productIn.total)) + total
            productIn.total = total
            productIn.date = date
            productIn.productId = productId
            await productIn.save()
            await product.save()
            res.status(200).json(response('success', 'updated', productIn))
        } catch (error) {
            res.status(500).json(response('fail', error.message))
        }
    }

    
}

module.exports = ProductInController
