const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'country';

const Country = sequelize.define('Country', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
  },
  deletedAt: {
    type: Sequelize.DATE,
  }
}, { hooks, tableName });

module.exports = Country;
