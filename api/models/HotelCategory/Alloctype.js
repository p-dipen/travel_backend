const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'alloctype';

const Alloctype = sequelize.define('Alloctype', {
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
  name: {
    type: Sequelize.STRING,
  },
  lname: {
    type: Sequelize.STRING,
  },
  stamp: {
    type: Sequelize.STRING,
  },
  stopsale: {
    type: Sequelize.INTEGER,
  },
  release: {
    type: Sequelize.INTEGER,
  },
  autoconfirm: {
    type: Sequelize.INTEGER,
  },
  resorder: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Alloctype;
