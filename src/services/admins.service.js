const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('./../libs/sequelize')

class AdminService {
  constructor() {
  
  }
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData ={
      ...data,
      user:{
        ...data.user,
        password:hash
      }
    }
    const newAdmin = await models.Admin.create({
      include: ['user']
    });
    delete newAdmin.dataValues.user.dataValues.password;
    return newAdmin;
  }

  async find() {
    const rta = await models.Admin.findAll();
    return rta;
  }

  async findOne(id) {
    const Admin = await models.Admin.findByPk(id);
    if(!Admin){
      throw boom.notFound('Admin not found');
    }
    return Admin;
  }

  async update(id, changes) {
    const hash = await bcrypt.hash(changes.user.password, 10);
    const upAdmin = {
      ...changes,
      user:{
        ...changes.user,
        password: hash
      }
    }
    const Admin = await this.findOne(id);
    const rta = await Admin.update(upAdmin,{
      include: ['user']
    });
    delete rta.dataValues.user.dataValues.password;
    return rta;
  }

  async delete(id) {
    const Admin = await this.findOne(id);
    await Admin.destroy();
    return { id };
  }
}

module.exports = AdminService;
