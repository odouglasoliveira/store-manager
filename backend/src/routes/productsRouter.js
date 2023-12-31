const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/productsMiddleware');

const router = express.Router();

router.get('/', productsController.findAll);
router.post('/', validateName, productsController.createProduct);
router.get('/:id', productsController.findById);
router.put('/:id', validateName, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;