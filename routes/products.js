const router = require('express').Router()
const ProductController = require('../controllers/product-controller')
const cloudinary = require('../middleware/cloudinary')

router.get('/', ProductController.index)
    .post('/', cloudinary.single('photo'), ProductController.store)

router.patch('/:id', cloudinary.single('photo'), ProductController.update)
    .get('/:id', ProductController.show)
    .delete('/:id', ProductController.destroy)
module.exports = router
