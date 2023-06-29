const { salesModel } = require('../models');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 'SUCCESS', data: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESS', data: sale };
};

module.exports = { 
  getAll,
  getById,
};