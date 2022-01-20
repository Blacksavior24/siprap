const { Model, DataTypes, Sequelize} = require('sequelize');

const CLIENT_TABLE = 'clients';

const ClientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  lastName:{
    allowNull: false,
    type: DataTypes.STRING
  },
  typeIDcard:{
    allowNull: false,
    type: DataTypes.STRING
  },
  IDcard:{
    allowNull: false,
    type: DataTypes.STRING
  },
  address:{
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Client extends Model{
  static associate(models){
    this.belongsToMany(models.User,{
      as: 'clientes',
      through: models.UserClient,
      foreignKey: 'userId',
      otherKey: 'clientId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = {CLIENT_TABLE, ClientSchema, Client}
