const { Model, DataTypes, Sequelize} = require('sequelize');
const {PRODUCT_TABLE} = require('./product.model');

const INVENTORY_TABLE = 'inventory';

const InventorySchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  expirationDate:{
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  quantity:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
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

class Inventory extends Model{
  static associate(models){
    this.belongsTo(models.Product, {as: 'product'});
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: INVENTORY_TABLE,
      modelName: 'Inventory',
      timestamps: false
    }
  }
}

module.exports = {INVENTORY_TABLE, InventorySchema, Inventory};

