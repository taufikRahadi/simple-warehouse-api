const Queue = require('bull')
const generatePDF = require('../services/generate-pdf')
const sendEmail = require('../services/send-email')

const reportQueue = new Queue('report-queue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: ''
    }
})

reportQueue.process(async job => {
    try {
        const pdf = await generatePDF(job.data.pdf)
        return await sendEmail({
            email: job.data.user,
            subject: 'Monthly Report',
            attachments: [
                {
                    filename: new Date() + '.pdf',
                    path: pdf.filename
                }
            ]
        })
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
})

module.exports = reportQueue
