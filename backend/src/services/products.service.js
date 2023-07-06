const { productsModel } = require('../models');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { status: 'SUCCESS', data: result };
};

const findById = async (id) => {
  const result = await productsModel.findById(id);
  if (!result) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESS', data: result };
};

const createProduct = async (name) => {
  const result = await productsModel.createProduct(name);
  return { status: 'SUCCESS', data: result };
};

const updateProduct = async (id, name) => {
  const product = await findById(id);
  if (product.status === 'NOT_FOUND') return product;
  const result = await productsModel.updateProduct(id, name);
  return { status: 'SUCCESS', data: result };
};

const deleteProduct = async (id) => {
  const product = await findById(id);
  if (product.status === 'NOT_FOUND') return product;
  const result = await productsModel.deleteProduct(id);
  return { status: 'SUCCESS', data: result };
};

module.exports = { 
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};