const express = require('express');

const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const reportsRouter = require('./reports.router');
const inventoryRouter = require('./inventory.router');
//const orderRouter = require('./orders.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/reports', reportsRouter);
  router.use('/categories', categoriesRouter);
  //router.use('/inventory', inventoryRouter);
  //router.use('/orders', orderRouter);
}

module.exports = routerApi;
