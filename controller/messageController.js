const { Sequelize, where } = require('sequelize')
const { Op } = require('sequelize')
const { messages } = require('../model/messageModel')

const createMessage = async (req, res, next) => {
    try {
        const {messageRoomId, receiverUserId, message} = req.body
        const senderuserId = req.decoded.id
        console.log("Sender User ID :", senderuserId)
        if (!messageRoomId) {
            const RoomId = await messages.findOne({
                where : {
                    [Op.or] : [
                                {receiver_user_id : senderuserId,
                                sender_user_id : receiverUserId},

                                {receiver_user_id : receiverUserId,
                                sender_user_id : senderuserId}
                    ]
                },
                attributes : ['message_room_id']
            })
            //     where : {
            //         [Op.or] : [
            //             {
            //                 [Op.or] : [
            //                     {receiver_user_id : senderuserId},
            //                     {sender_user_id : receiverUserId},
            //                 ]
            //             },
            //             {
            //                 [Op.or] : [
            //                     {receiver_user_id : receiverUserId},
            //                     {sender_user_id : senderuserId}
            //                 ]
            //             }   
            //         ]
            //     },
            //     attributes : ['message_room_id']
            // })
            if (RoomId) {
                console.log(RoomId.message_room_id,'dwadawdwa')
                const result = await messages.create({
                    
                    message_room_id : RoomId.message_room_id,
                    sender_user_id : senderuserId,
                    receiver_user_id : receiverUserId,
                    message : message
                })
                req.messagedata = {
                    id : receiverUserId,
                    title : 'you have new message',
                    message : 'you have new message' 
                }
                return next()
            }

            var latestRoomId = await messages.max('message_room_id')
            console.log('Latest Room Id : ',latestRoomId)
            const newLatestRoomId = latestRoomId? latestRoomId + 1 : 1;
            const result = await messages.create({
                
                message_room_id : newLatestRoomId,
                sender_user_id : senderuserId,
                receiver_user_id : receiverUserId,
                message : message
            })
            req.messagedata = {
                id : receiverUserId,
                title : 'you have new message',
                message : 'you have new message' 
            }
            return next()
        }
        const result = await messages.create({
            
            message_room_id : messageRoomId,
            sender_user_id : senderuserId,
            receiver_user_id : receiverUserId,
            message : message
        })
        req.messagedata = {
            id : receiverUserId,
            message : 'you have message' 
        }
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const getMessageNew = async (req, res) => {
    try {
        const {startMessageId, receiverUserId, direction} = req.query?? {}
        // var messageRoomId = req.query.messageRoomId
        var { messageRoomId } = req.query?? {}
        const senderUserId = req.decoded.id
        if (!messageRoomId && receiverUserId) {
            RoomId = await messages.findOne({
                where : {
                    [Op.or] : [
                        {
                            receiver_user_id : senderUserId,
                            sender_user_id : receiverUserId
                        },
                        {
                            receiver_user_id : receiverUserId,
                            sender_user_id : senderUserId
                        }
                    ]
                },
                attributes : ['message_room_id']
            })
            // if (!RoomId) {
            //     return res.status(404).json({status: "not found", massage : "user not have massage room id"})
            // }
            messageRoomId = RoomId.message_room_id
        }
        if (!startMessageId) {
            // get Latest Message by startMessageIdId = 0
            const result = await messages.findAll({
                where : {
                    message_room_id : messageRoomId,
                },
                attributes : ['receiver_user_id','sender_user_id','message'],
                order : [['id', 'DESC']],
                limit : 20
            })
            return res.status(200).json(result)
        }
        console.log('aneh 1')
        if (!messageRoomId) {
            if (!receiverUserId) {
                return res.status(400).json({
                    status : "failed",
                    message : 'receiverUserId is required'
                })
            }
            const listRoom = await messages.findAll({
                attributes : [
                    [Sequelize.fn('DISTINCT', Sequelize.col('message_room_id')), 'message_room_id'],
                    'sender_user_id',
                    'receiver_user_id'
                ],
                where : { 
                    [Op.or] : [
                        { sender_user_id : userId },
                        { receiver_user_id : userId },
                    ]
                }
            })
            return res.status(200).json(listRoom, userId)
        }
        if (!direction) {
            return res.status(400).json({message : 'direction is required'})
        }
        const operator = direction === 'forward'? Op.gte : Op.lte; 
        const result = await messages.findAll({
            where : {
                id : {[operator] : startMessageId},
                message_room_id : messageRoomId
            },
            attributes : ['receiver_user_id','sender_user_id','message'],
            order : [['id', 'DESC']],
            limit : 21
        })
        
        if (result.lenght < 21) {
            return res.status(200).json({result : result, islast : true})
        }
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const getMessage = async (req, res, next) => {
    try {
        const {startMessageId, receiverUserId} = req.query ?? {}
        var {messageRoomId} = req.query ?? {}
        const userId = req.decoded.id
        var RoomId
        const senderUserId = req.decoded.id
        console.log(messageRoomId)
        console.log("receive User ID : ",receiverUserId)
        if (!messageRoomId && !receiverUserId) {
            const listRoom = await messages.findAll({
                attributes : [
                    [Sequelize.fn('DISTINCT', Sequelize.col('message_room_id')), 'message_room_id'],
                    'sender_user_id',
                    'receiver_user_id'
                ],
                where : { 
                    [Op.or] : [
                        { sender_user_id : userId },
                        { receiver_user_id : userId },
                    ]
                }
            })
            // [{sender : 1, receiver :2 }, {sender : 3, receiver :1 }]  
            console.log("start 1")
            if (listRoom.length === 0) {
                console.log("start 2")
                return res.status(404).json({listroom: listRoom})
            }    
            console.log("start 3")
            const arraylistroom = listRoom.map(room => ({
                listroom : room.message_room_id,
                usertarget : room.receiver_user_id !== userId? room.receiver_user_id : room.sender_user_id 
            }))      
            const resultlistroom = Array.from(new Set(arraylistroom.map(JSON.stringify))).map(JSON.parse)
            console.log(resultlistroom)
            console.log(resultlistroom)
            
            const lastmassage = await Promise.all(resultlistroom.map(async (room)=>  {
                const message = await messages.findOne({
                    where : {
                        message_room_id : room.listroom,
                        sender_user_id : room.usertarget
                    },
                    order : [["id", "DESC"]],
                    attributes : ["message"],
                })
                return { message, room }
            }))
            const resultmessage = lastmassage.map(result => ({
                message : result.message ? result.message.message : null ,
                room : result.room
            })) 
            req.resultlistroom = resultmessage
            if (resultmessage.lenght == 0) {
                return res.status(200).json({listroom : listRoom ,userid : userId})
            }
            return next()
            // findlast and bulk
        }
        console.log("start 4")
        if (userId && receiverUserId) {
            RoomId = await messages.findOne({
                where : {
                    [Op.or] : [
                        {
                            receiver_user_id : senderUserId,
                            sender_user_id : receiverUserId
                        },
                        {
                            receiver_user_id : receiverUserId,
                            sender_user_id : senderUserId
                        }
                    ]
                },
                attributes : ['message_room_id']
            })
            // if (!RoomId) {
            //     return res.status(404).json({status: "not found", massage : "user not have massage room id"})
            // }
            console.log("message ROOM ID Hasil 1 : " ,RoomId)
            if (RoomId === null) {
                return res.status(404).json({
                    status : 'not found',
                    result : " "
                })
            }
            console.log("message ROOM ID Hasil: " ,RoomId.message_room_id)
            messageRoomId = RoomId.message_room_id
            console.log("message ROOM ID : " ,messageRoomId)
        }
        if (!startMessageId) {
            console.log("message ROOM ID : " ,messageRoomId)
            // get Latest Message by startMessageIdId = 0
            const result = await messages.findAll({
                where : {
                    message_room_id : messageRoomId,
                },
                attributes : ['receiver_user_id','sender_user_id','message', 'createdAt'],
                order : [['id', 'DESC']],
                limit : 21
            })
            const islast = result.length === 21
            if (islast) {
                result.pop()
            }
            console.log(result.length)
            return res.status(200).json({
                result : result.reverse(),
                islast : islast
            })
        }
        if (!direction) {
            return res.status(400).json({message : 'direction is required'})
        }
        const operator = direction === 'forward'? Op.gte : Op.lte; 
        const result = await messages.findAll({
            where : {
                id : {[operator] : startMessageId},
                message_room_id : messageRoomId
            },
            attributes : ['id','receiver_user_id','sender_user_id','message'],
            order : [['id', 'DESC']],
            limit : 21
        })
        
        if (result.lenght < 21) {
            return res.status(200).json({result : result, islast : true})
        }
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}


module.exports = {createMessage, getMessage}
