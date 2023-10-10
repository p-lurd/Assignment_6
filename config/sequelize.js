const {Sequelize} = require ('sequelize');
const path = require ('path');
require ('dotenv').config();
const config = require('./config')


const sequelize = new Sequelize(config.development)

module.exports = sequelize;