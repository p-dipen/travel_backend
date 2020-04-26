const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const Room = require('./AdminHotelRoom');

const hooks = {};

const tableName = 'admin_hotel_room_rates';

const AdminHotelRoomRates = sequelize.define('AdminHotelRoomRates', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    date_from: {
        type: Sequelize.DATE,
    },
    date_to: {
        type: Sequelize.DATE,
    },
    commission_type: {
        type: Sequelize.STRING,
    },
    commission_weekday: {
        type: Sequelize.FLOAT,
    },
    commission_weekend: {
        type: Sequelize.FLOAT,
    },
    net_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    net_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    cost_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    cost_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    per_adult_net_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    per_adult_net_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    per_adult_cost_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    per_adult_cost_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    per_child_net_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    per_child_net_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    per_child_cost_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    per_child_cost_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    per_infant_net_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    per_infant_net_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    per_infant_cost_rate_weekday: {
        type: Sequelize.FLOAT,
    },
    per_infant_cost_rate_weekend: {
        type: Sequelize.FLOAT,
    },
    extra_adult_weekday: {
        type: Sequelize.FLOAT,
    },
    extra_adult_weekend: {
        type: Sequelize.FLOAT,
    },
    extra_child_weekday: {
        type: Sequelize.FLOAT,
    },
    extra_child_weekend: {
        type: Sequelize.FLOAT,
    },
    extra_infant_weekday: {
        type: Sequelize.FLOAT,
    },
    extra_infant_weekend: {
        type: Sequelize.FLOAT,
    },
    allocation_weekday: {
        type: Sequelize.FLOAT,
    },
    allocation_weekend: {
        type: Sequelize.FLOAT,
    },
    min_stay: {
        type: Sequelize.FLOAT,
    },
    max_room_per_booking: {
        type: Sequelize.FLOAT,
    },
    notification_after_units: {
        type: Sequelize.FLOAT,
    },
    cut_of_day: {
        type: Sequelize.FLOAT,
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

module.exports = AdminHotelRoomRates;
