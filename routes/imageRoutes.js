const express = require('express')

const path = require('path')
const fs = require('fs')
const upload = require('../Middleware/uploadMiddleware')
const { veryfyToken , OptionalValidationToken} = require('../Middleware/authMiddleware')
const imageController = require('../controller/imageController')
const followerController = require('../controller/followerController')
const notificationController = require('../controller/notificationController')
const likeController = require('../controller/likeController')
const collectionController = require('../controller/collectionController')

const router = express.Router();


// search image by imageName
router.get('/search', imageController.getImageByName)

// get image detail required authstatus, imageId, userId or token
router.get('/detail', veryfyToken, imageController.getImageDetail, collectionController.getCollection, likeController.getlike)

// uplod prhoto_profile required formData("prhotoprofile") and token
router.post('/photo_profile', veryfyToken, upload.single('photo_profile'), (req, res) => {
    res.json({ message: 'success' });
})

// upload image, checking follower, make notification
router.post('/', veryfyToken, upload.single('image'), followerController.geUserFollowerList, notificationController.bulkCreateNotification, (req, res) => {
    res.json({ message: 'berhasil' });
})

router.get('/:folder/:filename', (req, res) => {
    const {folder, filename} = req.params;
    const dirUploads = path.resolve(__dirname, '..', 'uploads')
    const filepath = path.join(dirUploads, folder, filename);
    console.log(filepath)
    if (fs.existsSync(filepath)) {
        console.log("Filepath : ",filepath)
        res.sendFile(filepath)
    } else {
        res.status(404).json({
            message: 'file is not found'
        })
    }
})

// get all images limit 3 required imageId and direction
router.get('/', imageController.getImages)

module.exports = router;