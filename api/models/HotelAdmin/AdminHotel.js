const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const hooks = {};

const tableName = 'admin_hotel';

const AdminHotel = sequelize.define('AdminHotel', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // doubt
    member_name: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    // doubt 
    country: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    province: {
        type: Sequelize.STRING,
    },
    pincode: {
        type: Sequelize.STRING,
    },
    timezone: {
        type: Sequelize.STRING,
    },
    telephone_num: {
        type: Sequelize.STRING,
    },
    contact_num: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    contact_person_name: {
        type: Sequelize.STRING,
    },
    website_link: {
        type: Sequelize.STRING,
    },
    communication_address: {
        type: Sequelize.BOOLEAN,
    },
    labels: {
        type: Sequelize.STRING,
    },
    images: {
        type: Sequelize.STRING,
    }
}, { hooks, tableName });

module.exports = AdminHotel;
