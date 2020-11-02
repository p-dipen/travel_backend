const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const RoomType = require('../Master/RoomType');

const hooks = {};

const tableName = 'admin_hotel_room';

const AdminHotelRoom = sequelize.define('AdminHotelRoom', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    total_room: {
        type: Sequelize.INTEGER
    },
    max_capacity: {
        type: Sequelize.INTEGER
    },
    total_bedroom_per_unit: {
        type: Sequelize.INTEGER
    },
    max_child: {
        type: Sequelize.INTEGER
    },
    max_adult: {
        type: Sequelize.INTEGER
    },
    max_infant: {
        type: Sequelize.INTEGER
    },
    buffer_room: {
        type: Sequelize.INTEGER
    },
    available_room: {
        type: Sequelize.INTEGER
    },
    images: {
        type: Sequelize.STRING
    },
    room_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: RoomType,
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

module.exports = AdminHotelRoom;
