
const {followers} = require('../model/followerModel')

const createFollower = async (req, res) => {
    try {
        const {followedUserId} = Object.keys(req.query).length > 0 ? req.query : req.body 
        const userId = req.decoded.id
        console.log("Followed User Id", followedUserId)
        if (!userId || !followedUserId || followedUserId == userId) {
            return res.status(400).json({message: 'userId or followedUserId is required or something went wrong'})
        }
        const validation = await followers.findOne({
            where : {
                following_user_id : userId,
                followed_user_id : followedUserId 
            },
            attributes : ['id']
        })
        if (validation) {
            return res.status(400).json({status : 'error',message : 'you have been followed'})
        }
        const result = await followers.create({
            id: '',
            following_user_id : userId,
            followed_user_id : followedUserId
        })
        if(result){
            return res.status(201).json({status : 'success'})
        }
        res.status(404).json({status : 'failed'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const deleteFollower = async (req, res) => {
    try {
        const {followedUserId} = req.query?? {}
        const userId = req.decoded.id
        console.log(userId)
        if (!userId || !followedUserId) {
            return res.status(400).json({
                status : 'success',
                message: 'userId or followedUserId is required'
            })
        }
        const result = await followers.destroy({
            where :{
                following_user_id : userId,
                followed_user_id : followedUserId
            }
        })
        if(result){
            return res.status(201).json({status : 'success'})
        }
        res.status(404).json({status : 'success'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}
const getFollowing = async (req, res) => {
    try {
        const {followedUserId} = Object.keys(req.query).length > 0 ? req.query : req.body
        const userId = req.decoded.id
        if (!userId) {
            return res.status(400).json({
                status : "error",
                message : "userId is required"
            })
        }     
        const result = await followers.findOne({
            where : {
                following_user_id : userId,
                followed_user_id : followedUserId
            },
            attributes : ['id']
        })
        console.log("Yah ")
        res.status(200).json({
            status : "success",
            result : result? true : false 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const geUserFollowerList = async (req, res, next) => {
    try {
        const userId = req.decoded.id
        const result = await followers.findAll({
            where : {
                followed_user_id : userId
            },
            attributes : ['following_user_id']
        })
        console.log(result)
        if (result) {
            const array = result.map(follower  =>({
                
                user_id : follower.following_user_id,
                title : req.title,
                message : req.message
            }))
            req.followerdata = array
            console.log(array, 'array')
            return next()
        }
        console.log('sdaw')
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'}
        )
    }
}

const countFollowerAndFollowed = async (req, res, next) => {
    try {
        const userId  = req.query.userId ? req.query.userId : req.decoded.id ;
        // const userId  = req.decoded.id ? req.decoded.id : req.query.userId ;
        if ( !userId)   {
            return res.status(400).json({message : 'userId is required'})
        }
        const countFollower = await followers.count({
            where : {
                followed_user_id : userId
            }

        })
        const countFollowed = await followers.count({
            where : {
                following_user_id : userId
            }
        })
        console.log(countFollowed,"followed")
        req.countfollowed = countFollowed? countFollowed: 0;
        req.countfollower = countFollower? countFollower: 0;
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const getUserFollowedList = async (req, res, next) =>{
    try {
        const { userId } = req.query?? {}
        if (!userId)   {
            return res.status(400).json({message : 'userId is required'})
        }
        const result = followers.findAll({
            where : {
                following_user_id : userId
            },
            attributes : ['followed_user_id'],
            limit : 5
        })
        if (result) {
            
        }
        res.status(404).json({
            status : 'failed',
            message : `${userId} doesnt followed someone`
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}
module.exports = {createFollower, deleteFollower, countFollowerAndFollowed, geUserFollowerList, getUserFollowedList, getFollowing}