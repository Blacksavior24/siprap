const {User, UserSchema} = require('./user.model');
const {Practice, PracticeSchema} = require('./practice.model');
const {Category, CategorySchema} = require('./category.model');
const {Report, ReportSchema} = require('./report.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Practice.init(PracticeSchema, Practice.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Report.init(ReportSchema, Report.config(sequelize));
  
  User.associate(sequelize.models);
  Practice.associate(sequelize.models);
  Category.associate(sequelize.models);
  Report.associate(sequelize.models);
}


module.exports = setupModels;
