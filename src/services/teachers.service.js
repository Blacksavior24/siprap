const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('./../libs/sequelize')

class TeacherService {
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
    const newTeacher = await models.Teacher.create(newData,{
      include:['user']
    });
    delete newTeacher.dataValues.user.dataValues.password;
    return newTeacher;
  }

  async find() {
    const rta = await models.Teacher.findAll({
      include:['user']
    });
    return rta;
  }

  async findOne(id) {
    const Teacher = await models.Teacher.findByPk(id,{
      include:['user']
    });
    if(!Teacher){
      throw boom.notFound('Teacher not found');
    }
    return Teacher;
  }

  async update(id, changes) {
    const hash = await bcrypt.hash(changes.user.password, 10);
    const upTeacher = {
      ...changes,
      user:{
        ...changes.user,
        password: hash
      }
    }
    const Teacher = await this.findOne(id);
    const rta = await Teacher.update(upTeacher,{
      include: ['user']
    });
    delete rta.dataValues.user.dataValues.password;
    return rta;
  }

  async delete(id) {
    const Teacher = await this.findOne(id);
    await Teacher.destroy();
    return { id };
  }
}

module.exports = TeacherService;
