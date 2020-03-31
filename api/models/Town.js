const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const State = require('./State');
const Region = require('./Region');

const hooks = {};
const tableName = 'town';

const Town = sequelize.define('Town', {
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
  stateid: {
    type: Sequelize.INTEGER,
    references: {
      model: State,
      key: 'inc',
    },
  },
  regionid: {
    type: Sequelize.INTEGER,
    references: {
      model: Region,
      key: 'inc',
    },
  },
  stamp: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Town;
