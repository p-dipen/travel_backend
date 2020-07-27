const Sequelize = require("sequelize");

const sequelize = require("../../../config/database");

const hooks = {};

const tableName = "accept_reject_hotel";

const AcceptRejectHotel = sequelize.define(
  "AcceptRejectHotel",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    travel_agent: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: "uniqueAdminHotelAcceptReject",
    },
    hotel_system_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: "uniqueAdminHotelAcceptReject",
    },
    accept_reject: {
      type: Sequelize.BOOLEAN,
    },
    admin_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: "uniqueAdminHotelAcceptReject",
    },
  },
  { hooks, tableName }
);

module.exports = AcceptRejectHotel;
