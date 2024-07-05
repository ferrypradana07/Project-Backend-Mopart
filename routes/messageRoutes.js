
const express = require('express')


const { veryfyToken } = require('../Middleware/authMiddleware')
const notificationController = require('../controller/notificationController')
const messageController = require('../controller/messageController')
const userController = require('../controller/userController') 

const router = express.Router();

// message have 5 route in 2 action

//required messageRoomId, senderuserId, receiverUserId, message
// required 3 param
//required getmessage have 3 route getListRoomMessage, getStartMessage and getMessageWithDirection
router.get('/',veryfyToken, messageController.getMessage, userController.getProfileandName)

// createMessage have 2 route : createroom and createmessage
// required 4 param
// create room need receiverUserId , message and token
// required startMessageId, messageRoomId, direction, message 
router.post('/' ,veryfyToken, messageController.createMessage, notificationController.singleCreateNotification)


module.exports = router;