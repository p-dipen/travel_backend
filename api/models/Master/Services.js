const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'services';

const Services = sequelize.define('Services', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  description: {
      type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Services;
