const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Servtype = require('./Servtype');

const hooks = {};

const tableName = 'service';

const Service = sequelize.define('Service', {
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
  servtypeid: {
    type: Sequelize.INTEGER,
    references: {
      model: Servtype,
      key: 'inc',
    },
  },
}, { hooks, tableName });

module.exports = Service;
