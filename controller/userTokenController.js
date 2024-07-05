const {userToken} = require('../model/userTokenModel')
const {domain} = require('../config/domain')


const createdTokenDB = async (req, res) => {
    try {
        const token = req.token
        const userId = req.userId
        const message = req.message
        console.log(userId, message, token)
        const result = await userToken.create({
            user_id : userId,
            token : token
        })
        const urlPhotoProfile = req.photoprofile? `${domain}/api/image/${userId}/profile.jpg` : '' ;
        console.log(urlPhotoProfile)
        if (result){
            return res.status(201).json({
                status : 'success',
                message : message,
                userid : userId,
                username : req.username,
                photoprofile : urlPhotoProfile,
                token : token
            })
        }
        res.status(400).json({
            status : 'failed', 
            messsage : 'invalid data user'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const deleteTokenDB = async (req, res) => {
    try {
        const { token } = req.query?? {}
        const userId = req.decoded.id
        const result = await userToken.destroy({
            where : {
                user_id : userId,
                token : token
            }
        })
        console.log(result) 
        if (result) {
            return res.status(200).json({
                status: 'success'
            })
        }
        res.status(400).json({
            status: 'failed', 
            message : 'token is invalid'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

module.exports = {createdTokenDB, deleteTokenDB}