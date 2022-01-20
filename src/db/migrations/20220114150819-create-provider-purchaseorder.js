'use strict';

const {ProviderSchema, PROVIDER_TABLE} = require('./../models/provider.model');
const {PurchaseOrderSchema, PURCHASEORDER_TABLE} = require('./../models/purchaseorder.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PROVIDER_TABLE, ProviderSchema);
    await queryInterface.createTable(PURCHASEORDER_TABLE, PurchaseOrderSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PROVIDER_TABLE);
    await queryInterface.dropTable(PURCHASEORDER_TABLE);
  }
};

