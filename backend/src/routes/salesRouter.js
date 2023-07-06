const express = require('express');
const { salesController } = require('../controllers');
const { validateSale, validateProductId } = require('../middlewares/salesMiddleware');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', validateSale, validateProductId, salesController.insert);

module.exports = router;