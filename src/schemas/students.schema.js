const Joi = require('joi');
//import { Joi } from "joi";
const {createUserSchema, updateUserSchema} = require('./users.schema');

const id = Joi.number().integer();
const code = Joi.string();
const grade = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(6);
const name = Joi.string();
const lastName = Joi.string();
const dni = Joi.string();
const role = Joi.string();
const phone = Joi.string();

const getStudentSchema = Joi.object({
  id: id.required(),
});
const createStudentSchema = Joi.object({
  code: code.required(),
  grade: grade.required(),
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
  
const updateStudentSchema = Joi.object({
  code,
  grade,
  user: updateUserSchema
});
  
module.exports = { getStudentSchema, createStudentSchema, updateStudentSchema };