const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'spos';

const Spos = sequelize.define('Spos', {
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
  spodate: {
    type: Sequelize.DATE,
  },
  usecontract: {
    type: Sequelize.INTEGER,
  },
  mixed: {
    type: Sequelize.INTEGER,
  },
  ebooking: {
    type: Sequelize.INTEGER,
  },
  usesaleprice: {
    type: Sequelize.INTEGER,
  },
  note: {
    type: Sequelize.STRING(3000),
  },
  Canceldate: {
    type: Sequelize.DATE,
  },
}, { hooks, tableName });

module.exports = Spos;
