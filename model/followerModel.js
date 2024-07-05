const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
const { users } = require('./userModel') 

const followers = sequelize.define('followers',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    following_user_id : {
        type: DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: users,
            key: 'id'
        }
    },
    followed_user_id : {
        type: DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: users,
            key: 'id'}
    }
},{
    indexes : [
        {
            name : 'index_following_user_id',
            fields : ['following_user_id']
        },
        {
            name : 'index_followed_user_id',
            fields : ['followed_user_id']
        },
        {
            name : 'index_followed_user_id_and_following_user_id',
            fields : ['followed_user_id', 'following_user_id']
        }
    ]
})

module.exports = {followers}