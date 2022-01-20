const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const code = Joi.string().max(13);
const description = Joi.string().min(5);
const purchasePrice = Joi.number().precision(2);
const salePrice = Joi.number().precision(2);
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  code: code.required(),
  description: description.required(),
  purchasePrice: purchasePrice.required(),
  salePrice: salePrice.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  description: description,
  purchasePrice: purchasePrice,
  salePrice: salePrice,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
