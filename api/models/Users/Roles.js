const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

const hooks = {};
const tableName = 'role_master';


const Role = sequelize.define('Role', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    staticID: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
  }, { hooks, tableName });
  
  module.exports = Role;