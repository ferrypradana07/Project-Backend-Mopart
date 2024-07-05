const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
const { users, notifications } = require('./userModel')
const { images } = require('./imageModel')

const collections = sequelize.define('collections', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    // Collected_user_id mungkin tidak berguna
    image_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: images,
            key: 'id'}
    }
},{
    indexes : [
        {
            name : 'index_user_id',
            fields : ['user_id']
        },
        {
            name : 'index_image_id',
            fields : ['image_id']
        }]  
})

module.exports = {collections}