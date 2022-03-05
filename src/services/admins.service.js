const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const {models} = require('./../libs/sequelize')

class AdminService {
  constructor() {
  
  }
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newAdmin = await models.Admin.create({
      ...data,
      password: hash
    });
    delete newAdmin.dataValues.password;
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
    const hash = await bcrypt.hash(changes.password, 10);
    const Admin = await this.findOne(id);
    const rta = await Admin.update({
      ...changes,
      password: hash
    });
    delete rta.dataValues.password;
    return rta;
  }

  async delete(id) {
    const Admin = await this.findOne(id);
    await Admin.destroy();
    return { id };
  }
}

module.exports = AdminService;
