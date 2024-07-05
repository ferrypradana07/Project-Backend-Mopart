const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');

const developers = sequelize.define('developers', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    image : {
        type : DataTypes.STRING,
        allowNull : false
    },
    updatedAt : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW
    },
    createdAt : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW
    }
})

module.exports = {developers}