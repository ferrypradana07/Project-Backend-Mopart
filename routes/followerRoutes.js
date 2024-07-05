const express = require('express')


const { veryfyToken } = require('../Middleware/authMiddleware')
const followerController = require('../controller/followerController')

const router = express.Router();

// create follower required followedUserId and token
router.put('/', veryfyToken, followerController.createFollower)

// delete follower required followeduserId and token
router.delete('/', veryfyToken, followerController.deleteFollower)

router.get('/', veryfyToken, followerController.getFollowing)


module.exports = router;