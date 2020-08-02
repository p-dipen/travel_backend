const Sequelize = require("sequelize");

const sequelize = require("../../../config/database");

const hooks = {};

const tableName = "channel";

const Channels = sequelize.define(
  "Channels",
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    channelName: {
      type: Sequelize.STRING,
    },
    apiInfo: {
      type: Sequelize.STRING(1024),
    },
    apiDocLink: {
      type: Sequelize.STRING(512),
    },
    contactName: {
      type: Sequelize.STRING,
    },
    contactEmail: {
      type: Sequelize.STRING,
    },
    contactSkypeId: {
      type: Sequelize.STRING,
    },
    contactPhoneNumber: {
      type: Sequelize.STRING,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
    updatedBy: {
      type: Sequelize.STRING,
    },
  },
  { hooks, tableName }
);

module.exports = Channels;
