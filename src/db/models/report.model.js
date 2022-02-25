const { datatype } = require('faker');
const { Model, DataTypes, Sequelize} = require('sequelize');
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
    type: DataTypes.STRING
  },
  state:{
    allowNull: false,
    type: DataTypes.STRING
  },
  customerId:{
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
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
    this.belongsTo(models.Customer,{
      as: 'customer',
    });
    this.belongsToMany(models.Product,{
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }
  static config(sequelize){
    return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = {REPORT_TABLE,ReportSchema,Report};