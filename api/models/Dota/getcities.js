const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'getcities';

const schema = 'dota';

const Cities = sequelize.define('Cities', {
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
  countryname: {
      type: Sequelize.STRING,
  },
  countrycode: {
      type: Sequelize.BIGINT,
  }
}, { hooks, tableName, schema });

module.exports = Cities;
