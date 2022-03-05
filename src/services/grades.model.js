const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class GradeService {

  constructor(){
  }
  async create(data) {
    const newGrade = await models.Grade.create(data);
    return newGrade;
  }

  async find() {
    const grades = await models.Grade.findAll();
    return grades;
  }

  async findOne(id) {
    const Grade = await models.Grade.findByPk(id);
    return Grade;
  }

  async update(id, changes) {
    const Grade = await this.findOne(id);
    const rta = await Grade.update(changes);
    return rta;
  }

  async delete(id) {
    const Grade = await this.findOne(id);
    await Grade.destroy();
    return { id };
  }

}

module.exports = GradeService;
