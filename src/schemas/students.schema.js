const Joi = require('joi');
//import { Joi } from "joi";

const id = Joi.number().integer();
const code = Joi.string();
const grade = Joi.string();