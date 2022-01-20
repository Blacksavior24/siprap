'use strict';

const {PURCHASEORDER_PRODUCT_TABLE, PurchaseOrderProductSchema} = require('../models/purchaseorder-product.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PURCHASEORDER_PRODUCT_TABLE, PurchaseOrderProductSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(PURCHASEORDER_PRODUCT_TABLE);
  }
};
