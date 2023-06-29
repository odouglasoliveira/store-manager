const { productsModel } = require('../models');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { status: 'SUCCESS', data: result };
};

const findById = async (id) => {
  const result = await productsModel.findById(id);
  if (result === undefined) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESS', data: result };
};

const createProduct = async (name) => {
  const result = await productsModel.createProduct(name);
  return { status: 'SUCCESS', data: result };
};

module.exports = { 
  findAll,
  findById,
  createProduct,
};