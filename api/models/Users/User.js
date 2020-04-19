const Sequelize = require('sequelize');
const sequelize = require('../../../config/database');
const bcryptService = require("../../services/bcrypt.service");
const Role = require("./Roles");
const hooks = {
    beforeCreate(user) {
        user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
    }
};
const tableName = 'user_master';


const User = sequelize.define('User', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    phonenumber: {
        type: Sequelize.STRING,
        unique: true
    },
    activation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    token: {
        type: Sequelize.STRING
    }
}, {
    hooks,
    tableName

}, { hooks, tableName });




// eslint-disable-next-line
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
};

module.exports = User;