const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const Room = require('./AdminHotelRoom');

const hooks = {};

const tableName = 'admin_hotel_stop_sell';

const AdminHotelStopSell = sequelize.define('AdminHotelStopSell', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: Sequelize.DATEONLY,
    },
    roomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Room,
            key: 'id',
        }
    },
    hotelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: AdminHotel,
            key: 'id',
        }
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
    },
    deletedAt: {
        type: Sequelize.DATE,
    }
}, { hooks, tableName });

module.exports = AdminHotelStopSell;
