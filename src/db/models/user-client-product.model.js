const { Model, DataTypes, Sequelize} = require('sequelize');
const {USER_CLIENT_TABLE} = require('./user-client.model');
const {PRODUCT_TABLE} = require('./product.model');

const USERCLIENT_PRODUCT_TABLE = 'usersclients_products';
//registro venta

const UserClientProductSchema = {
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
  userclientId:{
    field: 'userclient_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_CLIENT_TABLE,
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

class UserClientProduct extends Model{
  static associate(models){
    //
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: USERCLIENT_PRODUCT_TABLE,
      modelName: 'UserClientProduct',
      timestamps: false
    }
  }
}

module.exports = {USERCLIENT_PRODUCT_TABLE,UserClientProductSchema, UserClientProduct};
