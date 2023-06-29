const { salesService } = require('../services');

const getAll = async (req, res) => res.status(200).json((await salesService.getAll()).data);

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = (await salesService.getById(id));
  if (sale.status === 'NOT_FOUND') return res.status(404).json(sale.data);
  return res.status(200).json(sale.data);
};

module.exports = {
  getAll,
  getById,
};