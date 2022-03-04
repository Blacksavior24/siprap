const { Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');

const ADMIN_TABLE = 'admins';

const AdminSchema = {
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
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Admin extends Model{
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: ADMIN_TABLE,
      modelName: 'Admin',
      timestamps: false
    }
  }
}

module.exports = {ADMIN_TABLE,AdminSchema,Admin};
