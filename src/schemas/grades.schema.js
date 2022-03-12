const Joi = require('joi');

const id = Joi.number().integer();
const contact = Joi.string();
const contact2 = Joi.string();

const getGradeSchema = Joi.object({
  id: id.required(),
});
const createGradeSchema = Joi.object({
  contact: contact.required(),
  contact2: contact2.required(),
});
  
const updateGradeSchema = Joi.object({
  contact,
  contact2,
});
  
module.exports = { getGradeSchema, createGradeSchema, updateGradeSchema };