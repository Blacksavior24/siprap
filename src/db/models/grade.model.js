const { Model, DataTypes, Sequelize} = require('sequelize');
const GRADE_TABLE = 'grades';

const GradeSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Grade extends Model{
  static associate(models){
    this.hasMany(models.Teacher,{
      as: 'teachers',
      foreignKey: 'gradeId'
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: GRADE_TABLE,
      modelName: 'Grade',
      timestamps: false
    }
  }
}

module.exports = {GRADE_TABLE,Grade,GradeSchema};

