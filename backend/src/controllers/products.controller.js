const joi = require('joi');
const { productsService } = require('../services');

const nameSchema = joi.string().required().min(5).label('name');

const findAll = async (req, res) => res.status(200).json((await productsService.findAll()).data);

const findById = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await productsService.findById(id);
  if (serviceResponse.status !== 'SUCCESS') {
    return res.status(404).json(serviceResponse.data);
  }
  return res.status(200).json(serviceResponse.data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { error } = nameSchema.validate(name);
  if (!name) return res.status(400).json({ message: error.message });
  if (error) return res.status(422).json({ message: error.message });
  const serviceResponse = await productsService.createProduct(name);
  return res.status(201).json(serviceResponse.data);
};

module.exports = {
  findById,
  findAll,
  createProduct,
};