const {User, UserSchema} = require('./user.model');
const {Admin, AdminSchema} = require('./admin.model');
const {Student, StudentSchema} = require('./student.model');
const {Teacher, TeacherSchema} = require('./teacher.model');
const {Grade, GradeSchema} = require('./grade.model');
const {Category, CategorySchema} = require('./category.model');
const {Report, ReportSchema} = require('./report.model');
const {CategoryTeacher, CategoryTeacherSchema} = require('./category-teacher.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Admin.init(AdminSchema, Admin.config(sequelize));
  Student.init(StudentSchema, Student.config(sequelize));
  Teacher.init(TeacherSchema, Teacher.config(sequelize));
  Grade.init(GradeSchema, Grade.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Report.init(ReportSchema, Report.config(sequelize));
  CategoryTeacher.init(CategoryTeacherSchema, CategoryTeacher.config(sequelize));
  
  User.associate(sequelize.models);
  Admin.associate(sequelize.models);
  Student.associate(sequelize.models);
  Teacher.associate(sequelize.models);
  Grade.associate(sequelize.models);
  Category.associate(sequelize.models);
  Report.associate(sequelize.models);
  CategoryTeacher.associate(sequelize.models);
}


module.exports = setupModels;
