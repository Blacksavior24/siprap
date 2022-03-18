const Joi = require('joi');
//import { Joi } from "joi";
const {createUserSchema, updateUserSchema} = require('./users.schema');

const id = Joi.number().integer();
const contact = Joi.string();
const contact2 = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string();
const lastName = Joi.string();
const dni = Joi.string();
const role = Joi.string();
const phone = Joi.string();
//const gradeId = Joi.number().integer()

const getTeacherSchema = Joi.object({
  id: id.required(),
});
const createTeacherSchema = Joi.object({
  contact: contact.required(),
  contact2: contact2.required(),
  user: Joi.object({
      email: email.required(),
      password: password.required(),
      name: name.required(),
      lastName: lastName.required(),
      dni: dni.required(),
      role: role.required(),
      phone,
  }),
  //gradeId
});
  
const updateTeacherSchema = Joi.object({
  contact,
  contact2,
  user: updateUserSchema,
  //gradeId
});
  
module.exports = { getTeacherSchema, createTeacherSchema, updateTeacherSchema };