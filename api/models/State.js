const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {};

const tableName = 'state';

const State = sequelize.define('State', {
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
  alias: {
    type: Sequelize.STRING,
  },
  stamp: {
    type: Sequelize.STRING,
  }
}, { hooks, tableName });

module.exports = State;
