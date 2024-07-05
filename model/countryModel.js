const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');

const countrys = sequelize.define('countrys',{
    id : {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = {countrys}