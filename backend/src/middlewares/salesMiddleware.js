const Joi = require('joi');
const { findById } = require('../services/products.service');

const saleSchema = Joi.object({
  productId: Joi
    .number()
    .integer()
    .required()
    .min(1)
    .label('productId'),
  quantity: Joi
    .number()
    .integer()
    .required()
    .min(1)
    .label('quantity'),
  });

const validateProductId = async (req, res, next) => {
  const sales = Array.isArray(req.body) ? req.body : [req.body];
  const validations = sales.map(async (sale) => {
    const { productId } = sale;
    const existsProduct = (await findById(productId)).status;
    return existsProduct;
  });
  const results = await Promise.all(validations);
  const invalidProductId = results.some((result) => result === 'NOT_FOUND');
  if (invalidProductId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const handleValidationError = (error, res) => {
  if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.message });
  } if (error.details[0].type === 'number.min') {
    return res.status(422).json({ message: error.message });
  }
};

const validateSale = (req, res, next) => {
  const sales = Array.isArray(req.body) ? req.body : [req.body];
  for (let i = 0; i < sales.length; i += 1) {
    const { error } = saleSchema.validate(sales[i]);
    if (error) {
      handleValidationError(error, res);
      return;
    }
  }
  next();
};

module.exports = {
  validateSale,
  validateProductId,
};