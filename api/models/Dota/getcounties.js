const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'getcountries';

const schema = 'dota';

const Countries = sequelize.define('Countries', {
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
  regionname: {
      type: Sequelize.STRING,
  },
  regioncode: {
      type: Sequelize.BIGINT,
  }
}, { hooks, tableName, schema });

module.exports = Countries;
