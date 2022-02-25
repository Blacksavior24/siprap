const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const getConnection = require('../libs/postgres');
const pool = require('../libs/postgres.pool');
const {models} = require('./../libs/sequelize')

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err)=> console.error(err));
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const hash = await bcrypt.hash(changes.password, 10);
    const user = await this.findOne(id);
    const rta = await user.update({
      ...changes,
      password: hash
    });
    delete rta.dataValues.password;
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
