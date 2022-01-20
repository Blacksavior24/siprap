const { Model, DataTypes, Sequelize} = require('sequelize');
const {PROVIDER_TABLE} = require('./provider.model');

const PURCHASEORDER_TABLE = 'purchaseorders';

const PurchaseOrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  date:{
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  providerId:{
    field: 'provider_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROVIDER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class PurchaseOrder extends Model{
  static associate(models){
    this.belongsTo(models.Provider, {as: 'provider'});
    this.belongsToMany(models.PurchaseOrder,{
      as: 'items',
      through: models.PurchaseOrderProduct,
      foreignKey: 'purchaseorderId',
      otherKey: 'productId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: PURCHASEORDER_TABLE,
      modelName: 'PurchaseOrder',
      timestamps: false
    }
  }
}

module.exports = {PURCHASEORDER_TABLE, PurchaseOrderSchema, PurchaseOrder};

