const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const Room = require('./AdminHotelRoom');
const BeddingType = require('../Master/BeddingType');

const hooks = {};

const tableName = 'admin_hotel_room_bedding';

const AdminHotelRoomBedding = sequelize.define('AdminHotelRoomBedding', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    bedding_config: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bedding_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: BeddingType,
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

module.exports = AdminHotelRoomBedding;
