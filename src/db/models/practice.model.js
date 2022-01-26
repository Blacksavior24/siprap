const { Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');

const PRACTICE_TABLE = 'practices';

const PracticeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  dni: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  code:{
    allowNull: false,
    type: DataTypes.STRING,
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
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Practice extends Model{
  static associate(models){
    this.hasOne(models.Practice,)
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order,{
      as: 'orders',
      foreignKey: 'customerId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: PRACTICE_TABLE,
      modelName: 'Practice',
      timestamps: false
    }
  }
}

module.exports = {PracticeSchema,PRACTICE_TABLE, Practice}
