const express = require('express')

const { veryfyToken } = require('../Middleware/authMiddleware')
const notificationController = require('../controller/notificationController')

const router = express.Router();

// get notification required token and startNotificationId
router.get('/', veryfyToken, notificationController.getNotification )

module.exports = router;