const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Hotel = require('./Hotel');
const Room = require('./Room');

const hooks = {};

const tableName = 'reserve';

const Reserve = sequelize.define('Reserve', {
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
  hotelid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Hotel,
      key: 'inc',
    },
  },
  roomid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Room,
      key: 'inc',
    },
  },
  datebeg: {
    type: Sequelize.DATE,
  },
  dateend: {
    type: Sequelize.DATE,
  },
  rcount: {
    type: Sequelize.INTEGER,
  },
  alloctype: {
    type: Sequelize.INTEGER,
  },
  commitmentpart: {
    type: Sequelize.INTEGER,
  },
  releasedays: {
    type: Sequelize.INTEGER,
  },
  stamp: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

module.exports = Reserve;
