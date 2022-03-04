'use strict';

const {ADMIN_TABLE, AdminSchema} = require('../models/admin.model');
const {STUDENT_TABLE, StudentSchema} = require('../models/student.model');
const {TEACHER_TABLE, TeacherSchema} = require('../models/teacher.model');
const {GRADE_TABLE, GradeSchema} = require('../models/grade.model');
const {CATEGORY_TABLE, CategorySchema} = require('../models/category.model');
const {REPORT_TABLE, ReportSchema} = require('../models/report.model');
const {CATEGORY_TEACHER_TABLE, CategoryTeacherSchema} = require('../models/category-teacher.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ADMIN_TABLE, AdminSchema);
    await queryInterface.createTable(STUDENT_TABLE,StudentSchema);
    await queryInterface.createTable(GRADE_TABLE,GradeSchema);
    await queryInterface.createTable(TEACHER_TABLE,TeacherSchema);
    //await queryInterface.createTable(GRADE_TABLE,GradeSchema);
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(REPORT_TABLE,ReportSchema);
    await queryInterface.createTable(CATEGORY_TEACHER_TABLE, CategoryTeacherSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ADMIN_TABLE);
  }
};
