const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const fecha = Joi.string();

const getGradeSchema = Joi.object({
  id: id.required(),
});
const createGradeSchema = Joi.object({
  name: name.required(),
  fecha: fecha.required(),
});
  
const updateGradeSchema = Joi.object({
  name,
  fecha,
});
  
module.exports = { getGradeSchema, createGradeSchema, updateGradeSchema };