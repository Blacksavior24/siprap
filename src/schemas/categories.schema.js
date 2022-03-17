const Joi = require('joi');
//lineas
const id = Joi.number().integer();
const name = Joi.string().min(3);
const teacherId = Joi.number().integer();
const categoryId = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const addLineTeacherSchema = Joi.object({
  teacherId: teacherId.required(),
  categoryId: categoryId.required()
})

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, addLineTeacherSchema }