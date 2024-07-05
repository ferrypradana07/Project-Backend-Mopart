const sequelize = require('../config/config')
const { Sequelize, DataTypes } = require('sequelize');
// const {countrys} = require('./countryModel')

const users = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    username : {
        type: DataTypes.STRING,
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
            key : 'name'
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

const images = sequelize.define('images', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_user : {
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
            name : 'index_id_user',
            fields : ['id_user']
        },
        {
            name : 'index_status_user',
            fields : ['status']
        }
    ]
})

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
    date_form : {
        type : DataTypes.DATE,
        allowNull : false
    }
}) 

const messages =  sequelize.define('messages', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user_sender :{
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users,
            key: 'id'}
    },
    id_user_receiver :{
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
            name : 'index_id_user_sender',
            fields : ['id_user_sender']
        },
        {
            name : 'index_id_user_receiver',
            fields : ['id_user_receiver']
        }
    ]
})

const notifications = sequelize.define('notifications', {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    id_user : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users,
            key: 'id'}
    },
    title : {
        type : DataTypes.STRING,
        allowNull: false
    },
    message:{
        type: DataTypes.TEXT,
    },
    timestamp:{
        type: DataTypes.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    indexes : [
        {
            name : 'index_id_user',
            fields : 'id_user'
        }
    ]
}) 

const followers = sequelize.define('followers',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    id_following_user : {
        type: DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: users,
            key: 'id'
        }
    },
    id_followed_user : {
        type: DataTypes.INTEGER,
        allowNull : false,
        references: {
            model: users,
            key: 'id'}
    }
},{
    indexes : [
        {
            name : 'index_id_following_user',
            fields : 'id_following_user'
        },
        {
            name : 'index_id_followed_user',
            fields : 'id_followed_user'
        }
    ]
})

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

const likes = sequelize.define('likes',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    id_user_like :{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    id_user_liked: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    id_image : {
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    indexes : [
        {
            name : 'index_id_user_like',
            fields : 'id_user_like'
        },
        {
            name : 'index_id_user_liked',
            fields : 'id_user_liked'
        }
    ]
})

const collections = sequelize.define('collections', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    id_user_collected:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: users,
            key: 'id'}
    },
    id_image:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: images,
            key: 'id'}
    }
},{
    indexes : [
        {
            name : 'index_id_user',
            fields : 'id_user'
        },
        {
            name : 'index_id_user_collected',
            fields : 'id_user_collected'
        },
        {
            name : 'index_id_image',
            fields : 'id_image'
        }]  
})

const userToken = sequelize.define('userToken', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_user : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references: {
            model : users,
            key : 'id'
        }
    },
    token : {
        type : DataTypes.STRING,
        allowNull : false,
    }
},{
    indexes : [{
        name : 'index_token',
        fields : token

    }]
}) 

const adminToken = sequelize.define('adminToken', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    id_user : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references: {
            model : users,
            key : 'id'
        }
    },
    token : {
        type : DataTypes.STRING,
        allowNull : false,
    }
}) 

const admin = sequelize.define({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

module.exports = {
    users,
    images, 
    messages, 
    collections, 
    likes, 
    countrys, 
    contactus,
    developers,
    notifications,
    followers,
    userToken,
    admins
}