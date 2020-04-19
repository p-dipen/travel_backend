const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');

const hooks = {};
const tableName = 'role_to_agency';


const RolesToAgency = sequelize.define('RolesToAgency', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    roleid: {
        type: Sequelize.STRING,
    },
    agencyid: {
        type: Sequelize.STRING,
    },
    userid: {
        type: Sequelize.BIGINT,
    },
}, { hooks, tableName });

module.exports = RolesToAgency;