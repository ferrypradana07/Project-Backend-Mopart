const {notifications} = require('../model/notificationModel')
const {Op} = require("sequelize")
const singleCreateNotification = async (req, res, next) => {
    try {
        const userId = req.userId
        if (req.messagedata) {
            const messagedata = req.messagedata
            const newrecord = await notifications.create({
                
                user_id : messagedata.id,
                title : messagedata.title,
                message : messagedata.message
            })
            return res.status(200).json({
                status: 'success'
            })
        }
        if (!userId) {
            return res.status(400).json({
                message: 'userId is required'
            })
        }
        const result = await notifications.create({
            
            user_id : userId,
            title : 'WELCOME TO MUSIUM OF ART',
            message : 'user was created successfully'
        })
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const bulkCreateNotification = async (req, res, next) => {
    try {
        const followerdata = req.followerdata
        if (followerdata) {
            const result = await notifications.bulkCreate(followerdata)
            return next()
        }
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const getNotification = async (req, res) => {
    try {
        const { startNotificationId } = req.query?? {}
        if (!req.decoded) {
            return res.status(400).json({
                status: "failed",
                message : 'userId is required'
            })
        }
        const userId = req.decoded.id
        if (startNotificationId) {
            const result = await notifications.findAll({
                where : {
                    user_id : userId,
                    id : {
                        [Op.lte] : startNotificationId}
                },
                attributes : ['id','title', 'message'],
                order : [['id', 'DESC']],
                limit : 10
            })
            return res.status(200).json(result)
        }
        const result = await notifications.findAll({
            where : {
                user_id : userId
            },
            attributes : ['id','title', 'message'],
            order : [['id', 'DESC']],
            limit : 10
        })
        console.log("Notification result : ",result)
        if (result.length > 0) {
            return res.status(200).json(result)
        }
        res.status(404).json({
            status : "not found",
            message : 'no notification'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : "error",
            message : 'Internal is error'
        })
    }
}

module.exports = {singleCreateNotification, bulkCreateNotification, getNotification}