const { salesService } = require('../services');

const getAll = async (_req, res) => res.status(200).json((await salesService.getAll()).data);

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = (await salesService.getById(id));
  if (sale.status === 'NOT_FOUND') return res.status(404).json(sale.data);
  return res.status(200).json(sale.data);
};

const insert = async (req, res) => {
  const sales = req.body;
  const salesResponse = Array.isArray(sales)
    ? await salesService.insert(sales)
    : await salesService.insert([sales]);
  return res.status(201).json(salesResponse.data);
};

module.exports = {
  getAll,
  getById,
  insert,
};