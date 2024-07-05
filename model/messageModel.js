const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
const { users } = require('./userModel') 

const messages =  sequelize.define('messages', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message_room_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    sender_user_id :{
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users,
            key: 'id'}
    },
    receiver_user_id :{
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users,
            key: 'id'}
    },
    message: {
        type : DataTypes.TEXT,
        allowNull: false
    },
    timestamp:{
        type : DataTypes.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    indexes : [
        {
            name : 'index_message_id',
            fields : ['id', 'message_room_id']
        },
        {
            name : 'index_receiver_user_id',
            fields : ['message_room_id','receiver_user_id']
        }
    ]
})

module.exports = {messages} 
    
