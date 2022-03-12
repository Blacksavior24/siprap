const express = require('express');

const TeacherService = require('./../services/teachers.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {updateTeacherSchema, createTeacherSchema, getTeacherSchema} = require('./../schemas/teachers.schema');

const router = express.Router();
const service = new TeacherService();

router.get('/',async (req, res, next)=>{
  try {
    const Teachers = await service.find();
    res.json(Teachers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getTeacherSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Teacher = await service.findOne(id);
      res.json(Teacher);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createTeacherSchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newTeacher = await service.create(body);
      res.status(201).json(newTeacher);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getTeacherSchema, 'params'),
  validatorHandler(updateTeacherSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Teacher = await service.update(id, body);
      res.json(Teacher);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getTeacherSchema, 'params'),
  async (req,res, next)=>{
  try {
    const {id} = req.params;
    await service.delete(id);
    res.status(201).json({id});
  } catch (error) {
    next(error);
  }
  }
);

module.exports = router;
