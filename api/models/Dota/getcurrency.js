const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'getcurrency';

const schema = 'dota';

const Currency = sequelize.define('GetCurrency', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
  },
  name: {
      type: Sequelize.STRING,
  },
  shortname: {
      type: Sequelize.STRING,
  }
}, { hooks, tableName, schema });

module.exports = Currency;
