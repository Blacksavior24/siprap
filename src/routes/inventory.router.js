const express = require('express');

const InventoryService = require('./../services/inventory.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {updateInventorySchema, createInventorySchema, getInventorySchema} = require('./../schemas/inventory.schema');

const router = express.Router();
const service = new InventoryService();

router.get('/',async (req, res, next)=>{
  try {
    const inventory = await service.find();
    res.json(inventory);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getInventorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const inventory = await service.findOne(id);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createInventorySchema, 'body'),
  async (req, res,next) => {
    try {
      const body = req.body;
      const newInventory = await service.create(body);
      res.status(201).json(newInventory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getInventorySchema, 'params'),
  validatorHandler(updateInventorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const inventory = await service.update(id, body);
      res.json(inventory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getInventorySchema, 'params'),
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
