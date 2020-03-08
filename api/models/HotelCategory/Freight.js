const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Town = require('../Town');
const Port = require('./Port');

const hooks = {};

const tableName = 'freight';

const Freight = sequelize.define('Freight', {
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
  trantypeid: {
    type: Sequelize.INTEGER,
    // reference: {
    //   model: Transport,
    //   key: 'inc',
    // },
  },
  sourceid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Town,
      key: 'inc',
    },
  },
  srcportid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Port,
      key: 'inc',
    },
  },
  targetid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Town,
      key: 'inc',
    },
  },
  trgportid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Port,
      key: 'inc',
    },
  },
}, { hooks, tableName });

module.exports = Freight;
