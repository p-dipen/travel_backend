const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Spos = require('./Spos');

const hooks = {};

const tableName = 'sposcombine';

const Sposcombine = sequelize.define('Sposcombine', {
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
  spos1: {
    type: Sequelize.INTEGER,
    reference: {
      model: Spos,
      key: 'inc',
    },
  },
  spos2: {
    type: Sequelize.INTEGER,
    reference: {
      model: Spos,
      key: 'inc',
    },
  },
  mixed: {
    type: Sequelize.INTEGER,
  },
  stamp: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Sposcombine;
