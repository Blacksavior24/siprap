const Joi = require('joi');

const id = Joi.number().integer();
const file = Joi.string();
const resume = Joi.string();
const state = Joi.string();
const title = Joi.string();
const keywords = Joi.string();
const studentId = Joi.number().integer();
const categoryId = Joi.number().integer();
const teacherId = Joi.number().integer();

const createReportSchema = Joi.object({
  file: file.required(),
  resume: resume.required(),
  state: state.required(),
  title: title.required(),
  keywords: keywords.required(),
  studentId: studentId.required(),
  categoryId: categoryId.required(),
  teacherId: teacherId.required()
});

const updateReportSchema = Joi.object({
  file: file,
  resume: resume,
  state: state,
  title: title,
  keywords: keywords,
  studentId: studentId,
  categoryId: categoryId,
  teacherId: teacherId,
});

const getReportSchema = Joi.object({
  id: id.required(),
});

module.exports = { createReportSchema, updateReportSchema, getReportSchema }
