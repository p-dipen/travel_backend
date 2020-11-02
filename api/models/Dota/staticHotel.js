const Sequelize = require("sequelize");

const sequelize = require("../../../config/database");

const hooks = {};

const tableName = "hoteldata";

const schema = "dota";

const HotelData = sequelize.define(
  "HotelData",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    hotelid: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
    },
    hotelname: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    countryCode: {
      type: Sequelize.BIGINT,
    },
    cityCode: {
      type: Sequelize.BIGINT,
    },
    roomtype: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
  },
  { hooks, tableName, schema }
);

module.exports = HotelData;
