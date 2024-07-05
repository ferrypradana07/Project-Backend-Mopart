const express = require('express')

const { veryfyToken } = require('../Middleware/authMiddleware')
const { veryfyTokenUpdatePassword, createTokenUpdatePassword } = require('../Middleware/tokenMiddleware')
const { sendMail } = require('../Middleware/mailerMiddleware')

const upload = require('../Middleware/uploadMiddleware')
const { domain } = require('../config/domain')
const userController = require('../controller/userController') 
const userTokenController = require('../controller/userTokenController')
const imageController = require('../controller/imageController')
const countryController = require('../controller/countryController')
const followerController = require('../controller/followerController')
const notificationController = require('../controller/notificationController')
const collectionController = require('../controller/collectionController')
const router = express.Router();

// registrasi required username, email and password
router.post('/registration', userController.createUser, notificationController.singleCreateNotification, userTokenController.createdTokenDB)

// authorisasi required email and password
router.post('/authentication', userController.getUserValidation, userTokenController.createdTokenDB)

// validasi token localstorage required only token
router.post('/validation', veryfyToken,  (req, res)=>{
    return res.status(200).json({
        status : "success",
        message : 'logged'
    })
})

// get users limit 16 required startUserID and direction
router.get('/', userController.getUsers)

router.post('/', veryfyToken, userController.UpdateDataUser)

// // get all images limit 30 required imageId and direction
router.get('/image', imageController.getUserImages)

// getting user's data profile like (imagedata , userdata, followerdata) required (userId, imageId, direction <for image direction>, )
router.get('/profile', userController.getDataUser, countryController.getCountryNameById,collectionController.getListImageCollection, imageController.getCollectionUserImagesLimit3, imageController.getLatestUserImagesLimit3, followerController.countFollowerAndFollowed , (req, res) =>{
    const url = req.userdata.photo_profile? `${domain}/api/image/${req.userdata.id}/profile.jpg` : '0' ;
    req.userdata.photo_profile = url
    console.log(req.imagedata)
    res.status(200).json({
        userdata : req.userdata,
        imagedata : req.imagedata,
        imagecollection : req.imagecollection,
        follower : req.countfollowed,
        followed : req.countfollower,
        like : req.countlike
    })
})

// create collection required imageId, token
router.get('/collection',collectionController.getListImageCollection, imageController.getUserCollectionImage)

// route validation email require userMail
router.post('/update-password/mail-validation', userController.EmailValidation, createTokenUpdatePassword, sendMail)

router.post('/update-profile',veryfyToken, upload.single('profile'), userController.UpdateDataUser)

// route validation token was sended to userMail require token 
router.post('/update-password/token-validation', veryfyTokenUpdatePassword, (req, res) => {
    res.status(200).json({
        isvalid : true
    })
})

// route validation password require token and newPassword
router.post('/update-password/password-validation', veryfyTokenUpdatePassword, userController.UpdateNewUserPassword)

module.exports = router;