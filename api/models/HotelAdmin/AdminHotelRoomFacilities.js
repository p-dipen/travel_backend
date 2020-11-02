const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const Room = require('./AdminHotelRoom');
const RoomFacilities = require('../Master/RoomFacilities');

const hooks = {};

const tableName = 'admin_hotel_room_facilities';

const AdminHotelRoomFacilities = sequelize.define('AdminHotelRoomFacilities', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    room_facility: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: RoomFacilities,
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

module.exports = AdminHotelRoomFacilities;
