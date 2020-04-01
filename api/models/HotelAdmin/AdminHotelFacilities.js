const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const AdminHotel = require('./AdminHotel');
const PropertyFacilities = require('../Master/PropertyFacilities');

const hooks = {};

const tableName = 'admin_hotel_facilities';

const AdminHotelFacilities = sequelize.define('AdminHotelFacilities', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    facilityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: PropertyFacilities,
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

module.exports = AdminHotelFacilities;
