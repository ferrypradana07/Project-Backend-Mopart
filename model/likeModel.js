const sequelize = require('../config/config')
const { DataTypes } = require('sequelize');
const { users } = require('./userModel') 

const likes = sequelize.define('likes',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    liked_by_user_id :{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    liked_user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    // liked user id liked buat apa cobak
    image_id : {
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    indexes : [
        {
            name : 'index_user_id_like',
            fields : ['liked_by_user_id']
        },
        {
            name : 'index_user_id_liked',
            fields : ['liked_user_id']
        }
    ]
})

module.exports = {likes}