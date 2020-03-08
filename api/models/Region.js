const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const State = require('./State').default;

const hooks = {};
const tableName = 'region';

const Region = sequelize.define('Region', {
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
    referencess: {
      model: State,
      key: 'inc',
    },
  },
  stamp: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Region;
