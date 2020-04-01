const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');

const hooks = {};

const tableName = 'admin_hotel_contact';

const AdminHotelContact = sequelize.define('AdminHotelContact', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
    },
    mobile_num: {
        type: Sequelize.STRING,
    },
    telephone_num: {
        type: Sequelize.STRING,
    },
    fax_num: {
        type: Sequelize.STRING,
    },
    website_link: {
        type: Sequelize.STRING,
    },
    hotelId: {
        type: Sequelize.INTEGER,
        references: {
          model: AdminHotel,
          key: 'id',
        },
      },
    isDeleted: {
        type: Sequelize.BOOLEAN,
    },
    deletedAt: {
        type: Sequelize.DATE,
    }
}, { hooks, tableName });

module.exports = AdminHotelContact;
