const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('./../libs/sequelize')

class StudentService {
  constructor() {
  
  }
  async create(data) {
    //const hash = await bcrypt.hash(data.password, 10);
    const newStudent = await models.Student.create(data,{
      //password: hash,
      include: ['user']
    });
    delete newStudent.dataValues.password;
    return newStudent;
  }

  async find() {
    const rta = await models.Student.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const Student = await models.Student.findByPk(id);
    if(!Student){
      throw boom.notFound('Student not found');
    }
    return Student;
  }

  async update(id, changes) {
    //const hash = await bcrypt.hash(changes.password, 10);
    const Student = await this.findOne(id);
    const rta = await Student.update({
      ...changes,
      //password: hash
    });
    delete rta.dataValues.password;
    return rta;
  }

  async delete(id) {
    const Student = await this.findOne(id);
    await Student.destroy();
    return { id };
  }
}

module.exports = StudentService;
