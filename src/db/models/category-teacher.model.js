const {Model,DataTypes,Sequelize} = require('sequelize');

const {CATEGORY_TABLE} = require('./category.model');
const {TEACHER_TABLE} = require('./teacher.model');

const CATEGORY_TEACHER_TABLE = 'categories_teachers';

const CategoryTeacherSchema = {
  id:{
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
  }
}

class CategoryTeacher extends Model{
    static associate(models){
        //
    }
    static config(sequelize){
      return{
        sequelize,
        tableName: CATEGORY_TEACHER_TABLE,
        modelName: 'CategoryTeacher',
        timestamps: false
      }
    }
}

module.exports = {CATEGORY_TEACHER_TABLE,CategoryTeacherSchema,CategoryTeacher}