const { Model, DataTypes, Sequelize} = require('sequelize');
const PROVIDER_TABLE = 'providers';

const ProviderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  businessName:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  ruc:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  address:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  phone: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Provider extends Model{
  static associate(models){
    this.hasMany(models.PurchaseOrder,{
      as: 'purchaseorders',
      foreignKey: 'purchaseOrderId'
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: PROVIDER_TABLE,
      modelName: 'Provider',
      timestamps: false
    }
  }
}

module.exports = {PROVIDER_TABLE, ProviderSchema, Provider};

