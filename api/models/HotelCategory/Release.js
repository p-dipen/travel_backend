const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Hotel = require('./Hotel');

const hooks = {};

const tableName = 'release';

const Release = sequelize.define('Release', {
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
  stamp: {
    type: Sequelize.STRING,
  },
  datebeg: {
    type: Sequelize.DATE,
  },
  dateeng: {
    type: Sequelize.DATE,
  },
  hotelid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Hotel,
      key: 'inc',
    },
  },
  days: {
    type: Sequelize.INTEGER,
  },
}, { hooks, tableName });

module.exports = Release;
