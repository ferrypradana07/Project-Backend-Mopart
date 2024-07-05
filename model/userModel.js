const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
const {countrys} = require('./countryModel')

const users = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    username : {
        type: DataTypes.STRING,
        unique : true,
        allowNull : false
    },
    email :{
        type : DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password : {
        type: DataTypes.STRING,
        allowNull : false
    },
    photo_profile : {
        type : DataTypes.STRING
    },
    professi :{
        type : DataTypes.STRING
    },
    country : {
        type : DataTypes.INTEGER,
        references : {
            model : countrys,
            key : 'id'
        }
    },
    created : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW
    },
    facebook : {
        type : DataTypes.STRING
    },
    instagram : {
        type : DataTypes.STRING
    },
    x : {
        type : DataTypes.STRING
    },
    whatsapp : {
        type : DataTypes.STRING
    },
    youtube : {
        type : DataTypes.STRING
    },
    status : {
        type: DataTypes.ENUM,
        values: ['aktif', 'pending', 'deleted'],
        defaultValue : 'aktif' 
    }
},{
    indexes : [
        {
            name : 'index_username',
            fields : ['username']
        },
        {
            name : 'index_email_user',
            fields : ['email']
        }
    ]
}
);

module.exports = { users }