const Joi = require('joi');
//import { Joi } from "joi";
const {createUserSchema, updateUserSchema} = require('./users.schema');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string();
const lastName = Joi.string();
const dni = Joi.string();
const role = Joi.string();
const phone = Joi.string();

const getAdminSchema = Joi.object({
  id: id.required(),
});
const createAdminSchema = Joi.object({
  //user: createUserSchema
  user: Joi.object({
      email: email.required(),
      password: password.required(),
      name: name.required(),
      lastName: lastName.required(),
      dni: dni.required(),
      role: role.required(),
      phone,
  })
});
  
const updateAdminSchema = Joi.object({
  user: updateUserSchema
});
  
module.exports = { getAdminSchema, createAdminSchema, updateAdminSchema };