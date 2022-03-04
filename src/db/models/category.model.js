const { Model, DataTypes, Sequelize} = require('sequelize');
const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}

class Category extends Model{
  static associate(models){
    this.hasOne(models.Report,{
      as: 'report',
      foreignKey: 'categoryId'
    });
    this.belongsToMany(models.Teacher,{
      as: 'lineas',
      through: models.CategoryTeacher,
      foreignKey: 'categoryId',
      otherKey: 'teacherId'
    });
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = {CATEGORY_TABLE, CategorySchema, Category};

