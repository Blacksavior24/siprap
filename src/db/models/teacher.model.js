const { Model, DataTypes, Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model');
const {GRADE_TABLE} = require('./grade.model');

const TEACHER_TABLE = 'teachers';

const TeacherSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  contact: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  contact2:{
    allowNull: true,
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
  },/*
  gradeId:{
    field: 'grade_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
        model: GRADE_TABLE,
        key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }*/
}

class Teacher extends Model{
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Report,{
        as: 'reports',
        foreignKey: 'teacherId'
    });
    //this.belongsTo(models.Grade, {as: 'grade'});
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: TEACHER_TABLE,
      modelName: 'Teacher',
      timestamps: false
    }
  }
}

module.exports = {TEACHER_TABLE,TeacherSchema,Teacher};
