const router = require('express').Router()
const ProductInController = require('../controllers/product-in-controller')

router.get('/', ProductInController.index)
    .post('/', ProductInController.store)

router.patch('/:id', ProductInController.update)

module.exports = router
