const { Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');

const STUDENT_TABLE = 'students';

const StudentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  grade:{
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

class Student extends Model{
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: STUDENT_TABLE,
      modelName: 'Student',
      timestamps: false
    }
  }
}

module.exports = {StudentSchema,STUDENT_TABLE, Student};
