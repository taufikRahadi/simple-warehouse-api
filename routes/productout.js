const router = require('express').Router()
const ProductOutController = require('../controllers/product-out-controller')

router.get('/', ProductOutController.index)
    .post('/', ProductOutController.store)

router.patch('/:id', ProductOutController.update)
    .get('/:id', ProductOutController.show)
    .delete('/:id', ProductOutController.destroy)

module.exports = router
