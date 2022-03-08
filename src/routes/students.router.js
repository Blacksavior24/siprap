const express = require('express');

const StudentService = require('./../services/students.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {updateStudentSchema, createStudentSchema, getStudentSchema} = require('./../schemas/students.schema');

const router = express.Router();
const service = new StudentService();

router.get('/',async (req, res, next)=>{
  try {
    const Students = await service.find();
    res.json(Students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getStudentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Student = await service.findOne(id);
      res.json(Student);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createStudentSchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newStudent = await service.create(body);
      res.status(201).json(newStudent);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getStudentSchema, 'params'),
  validatorHandler(updateStudentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Student = await service.update(id, body);
      res.json(Student);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getStudentSchema, 'params'),
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
