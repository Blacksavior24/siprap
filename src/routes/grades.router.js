const express = require('express');

const GradeService = require('./../services/grades.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {updateGradeSchema, createGradeSchema, getGradeSchema} = require('./../schemas/grades.schema');

const router = express.Router();
const service = new GradeService();

router.get('/',async (req, res, next)=>{
  try {
    const Grades = await service.find();
    res.json(Grades);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getGradeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Grade = await service.findOne(id);
      res.json(Grade);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createGradeSchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newGrade = await service.create(body);
      res.status(201).json(newGrade);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getGradeSchema, 'params'),
  validatorHandler(updateGradeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Grade = await service.update(id, body);
      res.json(Grade);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getGradeSchema, 'params'),
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
