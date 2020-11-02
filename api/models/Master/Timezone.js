const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Country = require('./Country');

const hooks = {};

const tableName = 'timezone';

const Timezone = sequelize.define('Timezone', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  timezone: {
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

module.exports = Timezone;
