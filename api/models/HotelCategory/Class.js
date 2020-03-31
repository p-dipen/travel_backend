const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'class';

const Class = sequelize.define('Class', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  inc: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  status: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  lname: {
    type: Sequelize.STRING,
  },
  stamp: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Class;
