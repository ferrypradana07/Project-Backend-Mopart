const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
const { users } = require('./userModel') 

const images = sequelize.define('images', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references: {
            model : users,
            key : 'id'
        }
    },
    image_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.TEXT 
    },
    status : {
        type : DataTypes.ENUM,
        values : ['active', 'pending', 'deleted']
    }
},{
    indexes : [
        {
            name : 'index_user_id_and_image_name',
            fields : ['user_id', 'image_name']
        },
        {
            name : 'index_status_user',
            fields : ['status']
        }
    ]
})

module.exports = {images}