const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Hotel = require('./Hotel');
const Service = require('./Service');
const Town = require('../Town');
const Currency = require('./Currency');

const hooks = {};

const tableName = 'servicesalepr';

const Servicesalepr = sequelize.define('Servicesalepr', {
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
  serviceid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Service,
      key: 'inc',
    },
  },
  hotelid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Hotel,
      key: 'inc',
    },
  },
  grouphotelid: {
    type: Sequelize.INTEGER, // left
  },
  townfromid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Town,
      key: 'inc',
    },
  },
  towntoid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Town,
      key: 'inc',
    },
  },
  datebeg: {
    type: Sequelize.DATE,
  },
  dateend: {
    type: Sequelize.DATE,
  },
  paxfrom: {
    type: Sequelize.INTEGER,
  },
  paxtill: {
    type: Sequelize.INTEGER,
  },
  nights: {
    type: Sequelize.INTEGER,
  },
  pernight: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  adultpr: {
    type: Sequelize.FLOAT,
  },
  child1pr: {
    type: Sequelize.FLOAT,
  },
  age1min: {
    type: Sequelize.FLOAT,
  },
  age1max: {
    type: Sequelize.FLOAT,
  },
  child2pr: {
    type: Sequelize.FLOAT,
  },
  age2min: {
    type: Sequelize.FLOAT,
  },
  age2max: {
    type: Sequelize.FLOAT,
  },
  currencyid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Currency,
      key: 'inc',
    },
  },
  rdatebeg: {
    type: Sequelize.DATE,
  },
  rdateend: {
    type: Sequelize.DATE,
  },
  spotype: {
    type: Sequelize.INTEGER,
    comment: '1 = Standard, 2 = Check-in, 3 Rotataion, 4 Accomodation, 5 MEal plan, 6 discount',
  },
}, { hooks, tableName });

module.exports = Servicesalepr;
