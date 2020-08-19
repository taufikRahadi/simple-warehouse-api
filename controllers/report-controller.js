const response = require('express')
const { Product, ProductOut, ProductIn, User } = require('../models')
const generatePDF = require('../services/generate-pdf')
const sendEmail = require('../services/send-email')

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
                        // date: new Date().getMonth(),
                        productId: req.params.id,
                    },
                    include: [
                        { model: Product, as: 'product' }
                    ]
                })
                let data = productIn.map(p => p.dataValues)
                const productData = data.map(p => p['product'] = p.product.dataValues)
                const pdf = await generatePDF(data)
                await sendEmail({
                    email: user.email,
                    subject: 'Monthly Report',
                    pdf: pdf.filename
                })
                res.status(200).send('Email Sent')
            }
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ReportController
