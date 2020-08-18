const router = require('express').Router()
const ProductController = require('../controllers/product-controller')
const cloudinary = require('../middleware/cloudinary')

router.get('/', ProductController.index)
    .post('/', cloudinary.single('photo'), ProductController.store)

module.exports = router
