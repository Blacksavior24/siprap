'use strict';

const {UserClientProductSchema,USERCLIENT_PRODUCT_TABLE} = require('../models/user-client-product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USERCLIENT_PRODUCT_TABLE, UserClientProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USERCLIENT_PRODUCT_TABLE);
  }
};
