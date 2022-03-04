const { Model, DataTypes, Sequelize} = require('sequelize');

const {STUDENT_TABLE} = require('./student.model');
const {TEACHER_TABLE } = require('./teacher.model');
const {CATEGORY_TABLE} = require('./category.model');

const REPORT_TABLE = 'reports';

const ReportSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  file:{
    allowNull: false,
    type: DataTypes.STRING
  },
  resume:{
    allowNull: false,
    type: DataTypes.TEXT
  },
  state:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  title:{
    allowNull:false,
    type: DataTypes.TEXT
  },
  keywords:{
    allowNull:false,
    type: DataTypes.TEXT
  },
  studentId:{
    field: 'student_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: STUDENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  teacherId:{
    field: 'teacher_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TEACHER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Report extends Model{
  static associate(models){
    this.belongsTo(models.Category,{
      as: 'category',
    });
    this.belongsTo(models.Student,{
      as: 'student',
    });
    this.belongsTo(models.Teacher,{
      as: 'teacher',
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: REPORT_TABLE,
      modelName: 'Report',
      timestamps: false
    }
  }
}

module.exports = {REPORT_TABLE,ReportSchema,Report};
