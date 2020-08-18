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
                const pdf = await generatePDF(productIn)
                // await sendEmail({
                    //     email: user.email,
                //     subject: 'Monthly Report',
                //     attachments: [
                //         {
                    //             filename: new Date(),
                //             path: pdf
                //         }
                //     ]
                // })
                res.json({productIn, pdf})
                // res.send(pdf)
            }
        } catch (err) {
            res.status(500).json(response('fail', err.message))
        }
    }
}

module.exports = ReportController
