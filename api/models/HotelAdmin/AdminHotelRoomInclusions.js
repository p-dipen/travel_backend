const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const Room = require('./AdminHotelRoom');
const RoomInclusions = require('../Master/Inclusions');

const hooks = {};

const tableName = 'admin_hotel_room_inclusions';

const AdminHotelRoomInclusions = sequelize.define('AdminHotelRoomInclusions', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    room_inclusions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: RoomInclusions,
            key: 'id',
        }
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

module.exports = AdminHotelRoomInclusions;
