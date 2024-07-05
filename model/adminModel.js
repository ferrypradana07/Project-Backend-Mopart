const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');

const admins = sequelize.define('admins',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
})


module.exports = { admins }