const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
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
  lastName:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  dni:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'student'
  },
  phone:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model{
  static associate(models){
    this.hasOne(models.Student,{
      as: 'student',
      foreignKey: 'userId'
    });
    this.hasOne(models.Teacher,{
      as: 'teacher',
      foreignKey: 'userId'
    });
    this.hasOne(models.Admin,{
      as: 'admin',
      foreignKey: 'userId'
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User}
