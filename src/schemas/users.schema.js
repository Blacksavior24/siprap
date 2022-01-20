const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const user = Joi.string();
const fullname = Joi.string();
const typeIDcard = Joi.string();
const IDcard = Joi.string();
const role = Joi.string();
const phone = Joi.string();
const status = Joi.string();

const createUserSchema = Joi.object({
  //id: id.required(),
  user: user.required(),
  fullname: fullname.required(),
  typeIDcard: typeIDcard.required(),
  IDcard: IDcard.required(),
  email: email.required(),
  role: role.required(),
  phone: phone.required(),
  password: password.required(),
  status: status.required()
});

const updateUserSchema = Joi.object({
  user: user,
  fullname: fullname,
  typeIDcard: typeIDcard,
  IDcard: IDcard,
  email: email,
  role: role,
  phone: phone,
  password: password,
  status: status
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }