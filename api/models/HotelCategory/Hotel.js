const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Star = require('./Star');
const Town = require('../Town');

const hooks = {};

const tableName = 'hotel';

const Hotel = sequelize.define('Hotel', {
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
  stamp: {
    type: Sequelize.STRING,
  },
  star: {
    type: Sequelize.INTEGER,
    references: {
      model: Star,
      key: 'inc',
    },
  },
  town: {
    type: Sequelize.INTEGER,
    references: {
      model: Town,
      key: 'inc',
    },
  },
}, { hooks, tableName });

module.exports = Hotel;
