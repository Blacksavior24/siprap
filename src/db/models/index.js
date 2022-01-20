const {User, UserSchema} = require('./user.model');

const {Category, CategorySchema} = require('./category.model');
const {Product, ProductSchema} = require('./product.model');
const {Inventory, InventorySchema} = require('./inventory.model');

const {Provider, ProviderSchema} = require('./provider.model');
const {PurchaseOrder, PurchaseOrderSchema} = require('./purchaseorder.model')

const {Client, ClientSchema} = require('./client.model');

const {PurchaseOrderProduct, PurchaseOrderProductSchema} = require('./purchaseorder-product.model');
const {UserClient, UserClientSchema} = require('./user-client.model');
const {UserClientProduct, UserClientProductSchema} = require('./user-client-product.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));

  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Inventory.init(InventorySchema, Inventory.config(sequelize));


  Provider.init(ProviderSchema, Provider.config(sequelize));
  PurchaseOrder.init(PurchaseOrderSchema, PurchaseOrder.config(sequelize));

  Client.init(ClientSchema, Client.config(sequelize));

  PurchaseOrderProduct.init(PurchaseOrderProductSchema, PurchaseOrderProduct.config(sequelize));
  UserClient.init(UserClientSchema, UserClient.config(sequelize));
  UserClientProduct.init(UserClientProductSchema,UserClientProduct.config(sequelize));

  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Inventory.associate(sequelize.models);

  Provider.associate(sequelize.models);
  PurchaseOrder.associate(sequelize.models);

  Client.associate(sequelize.models);
  PurchaseOrderProduct.associate(sequelize.models);
  UserClient.associate(sequelize.models);
  UserClientProduct.associate(sequelize.models);
}


module.exports = setupModels;
