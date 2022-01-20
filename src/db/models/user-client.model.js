const { Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');
const {CLIENT_TABLE} = require('./client.model');

const USER_CLIENT_TABLE = 'users_clients';

const UserClientSchema = {
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
  userId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  clientId:{
    field: 'client_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CLIENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class UserClient extends Model{
  static associate(models){
    this.belongsToMany(models.Product,{
      as:'productosclientes',//relación de los productos a clientes
      through: models.UserClientProduct,
      foreignKey: 'userclientId',
      otherKey: 'productId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: USER_CLIENT_TABLE,
      modelName: 'UserClient',
      timestamps: false
    }
  }
}

module.exports = {USER_CLIENT_TABLE,UserClientSchema,UserClient};
