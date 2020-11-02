const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Country = require('./Country');
const Province = require('./Province');

const hooks = {};

const tableName = 'city';

const City = sequelize.define('City', {
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
  provinceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Province,
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

module.exports = City;
