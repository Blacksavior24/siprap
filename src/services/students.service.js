const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('./../libs/sequelize')

class StudentService {
  constructor() {
  
  }
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    }
    const newStudent = await models.Student.create(newData,{
      include: ['user']
    });
    delete newStudent.dataValues.user.dataValues.password;
    return newStudent;
  }
  
  async find() {
    const rta = await models.Student.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const Student = await models.Student.findByPk(id,{
      include: ['user']
    });
    if(!Student){
      throw boom.notFound('Student not found');
    }
    return Student;
  }

  async update(id, changes) {
    const hash = await bcrypt.hash(changes.user.password, 10);
    const upStudent = {
      ...changes,
      user:{
        ...changes.user,
        password: hash
      }
    }
    const Student = await this.findOne(id);
    const rta = await Student.update(upStudent,{
      include: ['user']
    });
    delete rta.dataValues.user.dataValues.password;
    return rta;
  }

  async delete(id) {
    const Student = await this.findOne(id);
    await Student.destroy();
    return { id };
  }
}

module.exports = StudentService;
