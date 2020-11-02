const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Country = require('./Country');

const hooks = {};

const tableName = 'province';

const Province = sequelize.define('Province', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  countryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Country,
      key: 'id',
    }
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
  },
  deletedAt: {
    type: Sequelize.DATE,
  }
}, { hooks, tableName });

module.exports = Province;
