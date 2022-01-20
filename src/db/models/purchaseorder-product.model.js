const { Model, DataTypes, Sequelize} = require('sequelize');
const {PURCHASEORDER_TABLE} = require('./purchaseorder.model');
const {PRODUCT_TABLE} = require('./product.model');

const PURCHASEORDER_PRODUCT_TABLE = 'purchaseorders_products';

const PurchaseOrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  amount:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  purchaseorderId:{
    field: 'purchaseorder_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PURCHASEORDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId:{
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class PurchaseOrderProduct extends Model{
  static associate(models){
    //
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: PURCHASEORDER_PRODUCT_TABLE,
      modelName: 'PurchaseOrderProduct',
      timestamps: false
    }
  }
}

module.exports = {PURCHASEORDER_PRODUCT_TABLE,PurchaseOrderProductSchema,PurchaseOrderProduct};
