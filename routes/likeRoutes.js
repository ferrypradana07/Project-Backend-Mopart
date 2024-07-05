const express = require('express')


const { veryfyToken } = require('../Middleware/authMiddleware')
const imageController = require('../controller/imageController')
const likeController = require('../controller/likeController')

const router = express.Router();

// delete like required imageId, and token
router.delete('/', veryfyToken, likeController.deletelike)

// create like required imageId and token
router.put('/', veryfyToken, imageController.getImageOwnerIdByImageId, likeController.createLike)

// create like required imageId and token
router.get('/', likeController.countlike)



module.exports = router;