'use strict';

const {CategorySchema, CATEGORY_TABLE} = require('./../models/category.model.js');
const {ProductSchema, PRODUCT_TABLE} = require('./../models/product.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(CATEGORY_TABLE, 'description', CategorySchema.description);
    await queryInterface.addColumn(CATEGORY_TABLE, 'state', CategorySchema.state);
    await queryInterface.addColumn(PRODUCT_TABLE, 'purchasePrice', ProductSchema.purchasePrice);
    await queryInterface.addColumn(PRODUCT_TABLE, 'salePrice', ProductSchema.salePrice);
  },

  down: async (queryInterface) => {
    //await queryInterface.removeColumn(USER_TABLE,'role');
  }
};
