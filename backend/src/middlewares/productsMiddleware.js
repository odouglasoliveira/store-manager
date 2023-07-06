const Joi = require('joi');

const nameSchema = Joi.string().required().min(5).label('name');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const { error } = nameSchema.validate(name);
  if (!name) return res.status(400).json({ message: error.message });
  if (error) return res.status(422).json({ message: error.message });
  next();
};

module.exports = {
  validateName,
};