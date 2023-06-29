const { productsService } = require('../services');

const findAll = async (req, res) => res.status(200).json((await productsService.findAll()).data);

const findById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await productsService.findById(id);
  if (serviceResponse.status !== 'SUCCESS') {
    return res.status(404).json(serviceResponse.data);
  }
  return res.status(200).json(serviceResponse.data);
};

module.exports = {
  findById,
  findAll,
};