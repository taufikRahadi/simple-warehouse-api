const router = require('express').Router()
const ReportController = require('../controllers/report-controller')

router.get('/:type/:id', ReportController.sendEmail)

module.exports = router
