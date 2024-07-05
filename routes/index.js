const express = require('express')

const userRoutes = require('./userRoutes') 
const userTokenRoutes = require('./userTokenRoutes')
const imageRoutes = require('./imageRoutes')
const countryRoutes = require('./countryRoutes')
const developerRoutes = require('./developerRoutes')
const followerRoutes = require('./followerRoutes')
const notificationRoutes = require('./notificationRoutes')
const messageRoutes = require('./messageRoutes')
const contactusRoutes = require('./contactUsRoutes')
const likeRoutes = require('./likeRoutes')
const collectionRoutes = require('./collectionRoutes')
const adminRoutes = require('./adminRoutes')
const adminTokenRoutes = require('./adminTokenRoutes')

const router = express.Router();

router.use('/user/unauthorization', userTokenRoutes)
router.use('/unauthorization', userTokenRoutes)
router.use('/user', userRoutes)
router.use('/image', imageRoutes)
router.use('/collection', collectionRoutes)
router.use('/like', likeRoutes)
router.use('/contactus', contactusRoutes)
router.use('/notification', notificationRoutes)
router.use('/message', messageRoutes)
router.use('/follower', followerRoutes)
router.use('/countrys', countryRoutes)
router.use('/developers', developerRoutes)
router.use('/user', userRoutes)

router.use('/admin', adminRoutes)
router.use('/admin/token', adminTokenRoutes)


module.exports = router;