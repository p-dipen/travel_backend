const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

const hooks = {};
const tableName = 'agency_master';


const Agency = sequelize.define('Agency', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  }, { hooks, tableName });
  
  module.exports = Agency;