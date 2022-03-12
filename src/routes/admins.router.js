const express = require('express');

const AdminService = require('./../services/admins.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {updateAdminSchema, createAdminSchema, getAdminSchema} = require('./../schemas/admins.schema');

const router = express.Router();
const service = new AdminService();

router.get('/',async (req, res, next)=>{
  try {
    const Admins = await service.find();
    res.json(Admins);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getAdminSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Admin = await service.findOne(id);
      res.json(Admin);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createAdminSchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newAdmin = await service.create(body);
      res.status(201).json(newAdmin);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getAdminSchema, 'params'),
  validatorHandler(updateAdminSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const Admin = await service.update(id, body);
      res.json(Admin);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getAdminSchema, 'params'),
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
