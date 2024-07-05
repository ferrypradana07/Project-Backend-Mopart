const { likes } = require('../model/likeModel')

const createLike = async (req, res) => {
    try {
        console.log("lanjut Like")
        const imageId  = req.body.imageId || req.query.imageId
        console.log("Image Id : ",imageId)
        if (!imageId) {
            return res.status(400).json({
                status : "failed",
                message : "imageId is required"
            })
        }
        const userId = req.decoded.id
        const idUserLiked = req.imageownerid? req.imageownerid: req.query.userId 
        const validation = await likes.findOne({
            where : {
                liked_by_user_id : userId,
                image_id : imageId
            },
            attributes : ["id"]

        })
        if (validation) {
            return res.status(400).json({
                status : "failed",
                message : "you have liked"
            })
        }
        const result = await likes.create({
            
            liked_by_user_id : userId,
            liked_user_id : idUserLiked,
            image_id : imageId
        })
        if (result) {
            return res.status(200).json({status : 'success'})
        }
        res.status(400).json({
            status : 'failed', 
            message : "you have liked"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const deletelike = async (req, res) => {
    try {
        const { imageId } = req.query?? {}
        const userId = req.decoded.id
        if (!imageId) {
            return res.status(400).json({message: 'imageid is required'})
        }
        const result = await likes.destroy({
            where : {
                liked_by_user_id : userId,
                image_id : imageId
            }
        })
        res.status(200).json({status: 'success'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const getlike = async (req, res) => {
    try {
        const { imageId, authstatus } = req.query?? {}
        if(!imageId){
            return res.status(400).json({
                status : "failed",
                message : 'imageid is required'
            })
        }
        if (authstatus === 'false') {
            console.log("waduh jahat")
            return res.status(200).json(req.imagedata)
        }
        const userId = req.decoded.id 
        const result = await likes.findOne({
            where : {
                liked_by_user_id : userId,
                image_id : imageId 
            }
        })
        console.log("waduh jahat 2")
        res.status(200).json({
            imagedata : req.imagedata, 
            iscollect : req.userCollection, 
            islike : result? true : false
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const countlike = async (req, res, next) => {
    try {
        const {userId} = req.query || req.body
        console.log(req.query)
        console.log(req.body)
        console.log(req)
        if (!userId) {
            return res.status(400).json({
                status : "failed", 
                message : "userId is required"
            })
        }
        const countLikedUserId = userId ? userId : req.decoded.id;
        if (!countLikedUserId) {
            return res.status(400).json({
                status : "failed",
                message : 'userId is required'
            })
        } 
       
        const countLiked = await likes.count({
            where : {
                liked_user_id : userId
            }
        })
        if (countLiked) {
            return res.status(200).json(countLiked)
        }
        res.status(404).json({
            status : 'not found'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

module.exports = { createLike, deletelike, getlike, countlike }