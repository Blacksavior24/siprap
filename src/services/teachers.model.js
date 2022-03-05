const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('./../libs/sequelize')

class TeacherService {
  constructor() {
  
  }
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newTeacher = await models.Teacher.create({
      ...data,
      password: hash
    });
    delete newTeacher.dataValues.password;
    return newTeacher;
  }

  async find() {
    const rta = await models.Teacher.findAll();
    return rta;
  }

  async findOne(id) {
    const Teacher = await models.Teacher.findByPk(id);
    if(!Teacher){
      throw boom.notFound('Teacher not found');
    }
    return Teacher;
  }

  async update(id, changes) {
    const hash = await bcrypt.hash(changes.password, 10);
    const Teacher = await this.findOne(id);
    const rta = await Teacher.update({
      ...changes,
      password: hash
    });
    delete rta.dataValues.password;
    return rta;
  }

  async delete(id) {
    const Teacher = await this.findOne(id);
    await Teacher.destroy();
    return { id };
  }
}

module.exports = TeacherService;
