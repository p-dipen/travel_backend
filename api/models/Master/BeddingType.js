const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'bedding_type';

const BeddingType = sequelize.define('BeddingType', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
  },
  deletedAt: {
    type: Sequelize.DATE,
  }
}, { hooks, tableName });

module.exports = BeddingType;