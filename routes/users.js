var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user-controller')

/* GET users listing. */
router.get('/', UserController.index)
    .post('/', UserController.store)

router.patch('/:id', UserController.update)
    .get('/:id', UserController.show)
    .delete('/:id', UserController.destroy)

module.exports = router;
