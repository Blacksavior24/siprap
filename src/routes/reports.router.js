const express = require('express');

const reportService = require('./../services/reports.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {updateReportSchema, createReportSchema, getReportSchema} = require('./../schemas/reports.schema');

const router = express.Router();
const service = new reportService();

router.get('/',async (req, res, next)=>{
  try {
    const reports = await service.find();
    res.json(reports);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getReportSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const report = await service.findOne(id);
      res.json(report);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createReportSchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newreport = await service.create(body);
      res.status(201).json(newreport);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getReportSchema, 'params'),
  validatorHandler(updateReportSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const report = await service.update(id, body);
      res.json(report);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getReportSchema, 'params'),
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
