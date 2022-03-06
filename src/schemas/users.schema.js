const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string();
const lastName = Joi.string();
const dni = Joi.string();
const role = Joi.string();
const phone = Joi.string();

const createUserSchema = Joi.object({
  //id: id.required(),
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  dni: dni.required(),  
  role: role.required(),
  phone: phone.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  password: password,
  dni: dni,  
  role: role,
  phone: phone
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }