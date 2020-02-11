const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const Hotel = require('./Hotel');
const Room = require('./Room');
const Allocation = require('./Allocation');
const Meal = require('./Meal');
const Spos = require('./Spos');
const Currency = require('./Currency');

const hooks = {};

const tableName = 'hotelsalepr';

const Hotelsalepr = sequelize.define('Hotelsalepr', {
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
  datebeg: {
    type: Sequelize.DATE,
  },
  dateend: {
    type: Sequelize.DATE,
  },
  rqdatebeg: {
    type: Sequelize.DATE,
  },
  rqdateend: {
    type: Sequelize.DATE,
  },
  nights: {
    type: Sequelize.INTEGER,
  },
  sposid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Spos,
      key: 'inc',
    },
  },
  spotype: {
    type: Sequelize.INTEGER,
    comment: '1 = Standard, 2 = Check-in, 3 Rotataion, 4 Accomodation, 5 MEal plan, 6 discount',
  },
  sposubtype: {
    type: Sequelize.INTEGER,
    comment: `1 = Calculate without first dates
              ,2 = Calculate without last dates
              ,3 = Calculate as average value
              ,4 = Calculate without min price from the edge
              ,5 = Calculate without max price from the edge
              `,
  },
  rroom: {
    type: Sequelize.INTEGER,
    comment: 'For SPO “Accommodation”',
  },
  rhtplace: {
    type: Sequelize.INTEGER,
    comment: 'For SPO “Accommodation”',
  },
  rmeal: {
    type: Sequelize.INTEGER,
    comment: 'For SPO “Meal plan”',
  },
  rnights: {
    type: Sequelize.INTEGER,
    comment: 'For SPO “Rotation”',
  },
  price: {
    type: Sequelize.FLOAT,
  },
  currencyid: {
    type: Sequelize.INTEGER,
    reference: {
      model: Currency,
      key: 'inc',
    },
  },
  dateinfrom: {
    type: Sequelize.DATE,
  },
  dateoutfrom: {
    type: Sequelize.DATE,
  },
  dateintill: {
    type: Sequelize.DATE,
  },
  dateouttill: {
    type: Sequelize.DATE,
  },
  discount: {
    type: Sequelize.FLOAT,
  },
  discountmoney: {
    type: Sequelize.FLOAT,
  },
  useascheckin: {
    type: Sequelize.INTEGER,
  },
  nightsfrom: {
    type: Sequelize.INTEGER,
  },
  rqdaysfrom: {
    type: Sequelize.INTEGER,
  },
  rqdaysstill: {
    type: Sequelize.INTEGER,
  },
  nightstill: {
    type: Sequelize.INTEGER,
  },
  oncheckin: {
    type: Sequelize.INTEGER,
    comment: `For SPO “Rotaion”
          0 = By period (season dates contains whole accommodation period)

        1 = By check-in (season dates contains check-in date)
          `,
  },
  adult: {
    type: Sequelize.FLOAT,
  },
  child: {
    type: Sequelize.FLOAT,
  },
  nobedchild: {
    type: Sequelize.FLOAT,
  },
  suptotal: {
    type: Sequelize.FLOAT,
  },
  days: {
    type: Sequelize.STRING,
  },
  rnights_from: {
    type: Sequelize.INTEGER,
  },
  rnights_till: {
    type: Sequelize.INTEGER,
  },
  rnights_free: {
    type: Sequelize.INTEGER,
  },
}, { hooks, tableName });

module.exports = Hotelsalepr;
