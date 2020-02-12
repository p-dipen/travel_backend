const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Hotel = require('./Hotel');
const Room = require('./Room');
const Allocation = require('./Allocation');
const Meal = require('./Meal');

const hooks = {};

const tableName = 'stopsale';

const Stopsale = sequelize.define('Stopsale', {
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
  stamp: {
    type: Sequelize.STRING,
  },
  datebeg: {
    type: Sequelize.DATE,
  },
  dateend: {
    type: Sequelize.DATE,
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
  htplaceid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Allocation,
      key: 'inc',
    },
  },
  mealid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Meal,
      key: 'inc',
    },
  },
  checkin: {
    type: Sequelize.BOOLEAN,
  },
  issue: {
    type: Sequelize.DATE,
  },
  rqdatebeg: {
    type: Sequelize.DATE,
  },
  rqdateend: {
    type: Sequelize.DATE,
  },
  note: {
    type: Sequelize.STRING(3000),
  },
}, { hooks, tableName });

module.exports = Stopsale;
