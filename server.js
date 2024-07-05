const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const sequelize = require('./config/config')
const { portNumber } = require('./config/port')
// const bodyParser = require('body-parser')
// const upload = require('./Middleware/uploadMiddleware')
// const { veryfyToken , OptionalValidationToken} = require('./Middleware/authMiddleware')
// const { domain } = require('./config/domain')
// const userController = require('./controller/userController') 
// const userTokenController = require('./controller/userTokenController')
// const imageController = require('./controller/imageController')
// const countryController = require('./controller/countryController')
// const developerController = require('./controller/developerController')
// const followerController = require('./controller/followerController')
// const notificationController = require('./controller/notificationController')
// const messageController = require('./controller/messageController')
// const contactusController = require('./controller/contactusController')
// const likeController = require('./controller/likeController')
// const collectionController = require('./controller/collectionController')
// const adminController = require('./controller/adminController')
// const adminTokenController = require('./controller/adminTokenController')

const cors = require('cors')
app.use(cors())
// app.use(bodyParser.urlencoded({extended : true}))
app.use(express.urlencoded({extended : true}))

// app.use(bodyParser.json())
app.use(express.json())


const PORT = process.env.PORT || portNumber

// app.get('/image/:folder/:filename', (req, res) => {
//     const {folder, filename} = req.params;
//     const filepath = path.join(__dirname,'uploads', folder, filename);
//     console.log(filepath)
//     if (fs.existsSync(filepath)) {
//         console.log("Filepath : ",filepath)
//         res.sendFile(filepath)
//     } else {
//         res.status(404).json({
//             message: 'file is not found'
//         })
//     }
// })
const routes = require('./routes')

app.use('/api', routes)

// // every verify Token need authstatus from frontend

// // registrasi required username, email and password
// app.post('/api/user/registration', userController.createUser, notificationController.singleCreateNotification, userTokenController.createdTokenDB)

// // authorisasi required email and password
// app.post('/api/user/authentication', userController.getUserValidation, userTokenController.createdTokenDB)

// // validasi token localstorage required only token
// app.post('/api/user/validation', veryfyToken,  (req, res)=>{
//     return res.status(200).json({
//         status : "success",
//         message : 'logged'
//     })
// })

// // get users limit 16 required startUserID and direction
// app.get('/api/users', userController.getUsers)

// // delete token by userId
// // app.delete('/api/user/unauthorization',  userTokenController.deleteTokenDB)
// // app.delete('/api/user/unauthorization', (req, res) => {
// //     res.status(200).json({status : 'success'})
// // })
// app.delete('/api/user/unauthorization', veryfyToken, userTokenController.deleteTokenDB)

// // getting user's data profile like (imagedata , userdata, followerdata) required (userId, imageId, direction <for image direction>, )
// app.get('/api/user/profile', userController.getDataUser, countryController.getCountryNameById,collectionController.getListImageCollection, imageController.getCollectionUserImagesLimit3, imageController.getLatestUserImagesLimit3, followerController.countFollowerAndFollowed , (req, res) =>{
//     const url = req.userdata.photo_profile? `${domain}/image/${req.userdata.id}/profile.jpg` : '0' ;
//     req.userdata.photo_profile = url
//     console.log(req.imagedata)
//     res.status(200).json({
//         userdata : req.userdata,
//         imagedata : req.imagedata,
//         imagecollection : req.imagecollection,
//         follower : req.countfollowed,
//         followed : req.countfollower
//     })
// })

// // get all country name list no need request body just api
// app.get('/api/countrys', countryController.getCountrysList)

// // get all developer list no need request body just api
// app.get('/api/developers', developerController.getDevList)

// // search image by imageName
// app.get('/api/image/search', imageController.getImageByName)

// // get image detail required authstatus, imageId, userId or token
// app.get('/api/image/detail', OptionalValidationToken, imageController.getImageDetail, collectionController.getCollection, likeController.getlike)

// // uplod prhoto_profile required formData("prhotoprofile") and token
// app.post('/api/image/photo_profile', veryfyToken, upload.single('photo_profile'), (req, res) => {
//     res.json({ message: 'success' });
// })

// // upload image, checking follower, make notification
// app.post('/api/image', veryfyToken, upload.single('image'), followerController.geUserFollowerList, notificationController.bulkCreateNotification, (req, res) => {
//     res.json({ message: 'berhasil' });
// })

// // get all images limit 3 required imageId and direction
// app.get('/api/image', imageController.getImages)

// // get all images limit 30 required imageId and direction
// app.get('/api/user/image', imageController.getUserImages)

// // get all images limit 30 required imageId and direction
// app.get('/api/user/collection',collectionController.getListImageCollection, imageController.getUserCollectionImage)

// // create collection required imageId, token
// app.put('/api/collection',veryfyToken, imageController.getImageOwnerIdByImageId, collectionController.createCollection)

// // delete collection required imageId and token
// app.delete('/api/collection',veryfyToken, imageController.getImageOwnerIdByImageId,collectionController.deleteCollection)

// // delete like required imageId, and token
// app.delete('/api/like', veryfyToken, likeController.deletelike)

// // create like required imageId and token
// app.put('/api/like', veryfyToken, imageController.getImageOwnerIdByImageId, likeController.createLike)

// // create form contact us
// app.post('/api/contactus', contactusController.createForm)

// // getform contact us need id and name
// app.get('/api/contactus', contactusController.getForm)

// // create follower required followedUserId and token
// app.put('/api/following', veryfyToken, followerController.createFollower)

// // delete follower required followeduserId and token
// app.delete('/api/following', veryfyToken, followerController.deleteFollower)

// // get notification required token and startNotificationId
// app.get('/api/notification', veryfyToken, notificationController.getNotification )

// // message have 5 route in 2 action

// //required messageRoomId, senderuserId, receiverUserId, message
// // required 3 param
// //required getmessage have 3 route getListRoomMessage, getStartMessage and getMessageWithDirection
// app.get('/api/message',veryfyToken, messageController.getMessage, userController.getProfileandName)

// // createMessage have 2 route : createroom and createmessage
// // required 4 param
// // create room need receiverUserId , message and token
// // required startMessageId, messageRoomId, direction, message 
// app.post('/api/message' ,veryfyToken, messageController.createMessage, notificationController.singleCreateNotification)

sequelize.authenticate().then(() => {
    console.log('Connected with database')
})
    .catch((err) => {
        // res.status(500).json({message: err})
        console.log('Something went wrong')
})

sequelize.sync({}).then(() => {
    console.log('Connected with DDl Database Model ORM')
}).catch((err) => {
    console.log('Something going wrong with connection fiture DDL in Database Connection', err)
})

app.listen(PORT, () =>{
    console.log('Server running in PORT :', PORT)
})