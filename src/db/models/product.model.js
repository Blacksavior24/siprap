const { Model, DataTypes, Sequelize} = require('sequelize');
const {CATEGORY_TABLE} = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  code:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  purchasePrice:{
    type: DataTypes.DECIMAL(11,2),
    allowNull: false
  },
  salePrice:{
    type: DataTypes.DECIMAL(11,2),
    allowNull: false
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model{
  static associate(models){
    this.belongsTo(models.Category, {as: 'category'});
    this.hasMany(models.Inventory,{
      as: 'inventory',
      foreignKey: 'inventoryId'
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {PRODUCT_TABLE, ProductSchema, Product};

