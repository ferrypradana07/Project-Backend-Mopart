const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
const { admins } = require('./adminModel')

const adminToken = sequelize.define('adminToken', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    admin_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references: {
            model : admins,
            key : 'id'
        }
    },
    token : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}) 


module.exports = { adminToken }