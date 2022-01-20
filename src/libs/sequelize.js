const { Sequelize} = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',//cambiar a postgres a mysql sí desea probar la base de datos ORM
  logging: true,
});

setupModels(sequelize);
module.exports = sequelize;
