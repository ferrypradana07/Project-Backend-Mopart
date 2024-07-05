const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');

const contactus = sequelize.define('contactus', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    subject : {
        type : DataTypes.STRING,
    },
    message : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    date_form : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW,
    }
}) 

module.exports = {contactus}