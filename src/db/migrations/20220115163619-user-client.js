'use strict';

const {USER_CLIENT_TABLE,UserClientSchema} = require('../models/user-client.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_CLIENT_TABLE, UserClientSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_CLIENT_TABLE);
  }
};
