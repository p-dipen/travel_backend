const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'allocations';

const Allocations = sequelize.define('Allocations', {
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
  pcount: {
    type: Sequelize.INTEGER,
  },
  adult: {
    type: Sequelize.INTEGER,
  },
  child: {
    type: Sequelize.INTEGER,
  },
  infant: {
    type: Sequelize.INTEGER,
  },
  age1min: {
    type: Sequelize.FLOAT,
  },
  age1max: {
    type: Sequelize.FLOAT,
  },
  age2min: {
    type: Sequelize.FLOAT,
  },
  age2max: {
    type: Sequelize.FLOAT,
  },
  age3min: {
    type: Sequelize.FLOAT,
  },
  age3max: {
    type: Sequelize.FLOAT,
  },
}, { hooks, tableName });

module.exports = Allocations;
