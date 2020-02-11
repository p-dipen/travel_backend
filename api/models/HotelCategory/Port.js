const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Town = require('../Town');

const hooks = {};

const tableName = 'port';

const Port = sequelize.define('Port', {
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
  townid: {
    type: Sequelize.INTEGER,
    references: {
      model: Town,
      key: 'inc',
    },
  },
}, { hooks, tableName });

module.exports = Port;
