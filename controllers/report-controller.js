const response = require('express')
const { Product, ProductOut, ProductIn, User } = require('../models')
const generatePDF = require('../services/generate-pdf')
const sendEmail = require('../services/send-email')
const reportQueue = require('../queue/report')

class ReportController {
    static async sendEmail (req, res) {
        try {
            const { type } = req.params

            if(type === 'in') {
                const user = await User.findOne({
                    where: {
                        username: req.username,
                    },
                })
                const productIn = await ProductIn.findAll({
                    where: {
                        productId: req.params.id,
                    },
                    include: [
                        { model: Product, as: 'product' }
                    ]
                })
                console.log(productIn)
                let data = productIn.map(p => p.dataValues)
                const productData = data.map(p => p['product'] = p.product.dataValues)
                reportQueue.add({
                    pdf: data,
                    user: user.email,
                }, {
                    delay: 1000,
                    repeat: {
                        cron: '0 01 0 28-31 * *',
                    }
                })
                res.status(200).send('Email Sent')
            }
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ReportController
