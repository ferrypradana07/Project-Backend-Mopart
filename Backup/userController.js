const {users, followers, collections, contactus, countrys, likes, userToken, images, messages, notifications, userToken} = require('../model/userModel')
const { Op } = require('sequelize')
const {veryfyToken, signToken} = require('../Middleware/authMiddleware')

// Status response back only { Success, Created, Failed and Not Found}  
// Success code is 200, Failed code status is 400 and Not Found code status is 404

// buat di server .jsnya ulang lagi

const createUser = async (req, res) => {
    try {
        const {username , email, password} = req.query
        console.log(req.query.username)
        const validation = await getUserValidation(email, password)
        if(validation.id){
            return res.status(400).json({message : 'Email already registered'})
        }
        const newUser = await users.create({
            id : '', 
            username : username,
            email : email, 
            password : password
        })
        const token = await signToken({id : newUser.id, username : newUser.username, role : 'user'})
        const createToken = await userToken.create({
            id : '',
            id_user : newUser.id,
            token : token
        })
        console.log('Success')
        res.status(201).json({
            message : 'User created successfully',
            token : createToken.token
        })
    } catch (error) {
        res.status(500).json({error : `Something went wrong`})
    }
}
const getUsers = async (req, res) => {
    const { startUserID, direction } = req.query
    if (!startUserID || !direction){
        return res.status(400).json({message: 'startUserID or direction is required'})
    }
    const operator = direction === 'Forward'? Op.gte : Op.lte;
    const order = direction === 'Forward'? 'DESC' : 'ASC';
    try {
        const result = await users.findAll({
            where:{
                id : {
                    [operator] : startUserID
                }
            },    
            attributes : ['id', 'username', 'photo_profile'],
            limit: 16
        })
        const isLast = await users.findAll({
            where : {
                id : {
                    [operator] : startUserID
                }
            }, 
            attributes : ['id'],
            order : [['id', order]],
            limit : 17
        })
        const isLastResult = isLast.length < 17 ;
        res.status(200).json({
            isLast : isLastResult,
            result : result
        })
    } catch (error) { 
        res.status(500).json({
            messages : 'Internal server error'
        })
    }
} 

const getUserValidationForId = async (email, password) => {
    try {
        const result = await users.findOne({
            where:{  
                email: email
            }, attributes : ['id', 'password'],
        })
        const validationPassword = result.password === password? true : false;
        console.log(result.id)
        console.log(validationPassword)
        if(validationPassword){
            return result.id
        }
       return 'error'
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

const getUserValidation = async (req, res) => {
    try {
        const { token } = req.query
        veryfyToken
        console.log('Req value ',email, password)
        const result = await getUserValidationForId(email, password)
        if (result.id){
            const result = await users.findOne({
                where:{  
                    password : password,
                    email: email 
                }, attributes : ['username', 'email', 'password'],
            })
            console.log(result, 'Text')
            if(result)
                return res.status(200).json({
                    status : 'Founded',
                    message: 'Logged',
                    result : result,
            })
        }
        res.status(404).json({
            status: 'Not Found',
            message : 'User Email and Password Not Found'
        })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const getProfile = async (req, res) => {
    try {
        const { email, password } = req.query
        console.log('Req value ',email, password)
        const result = await getUserValidationForId(email, password)
        if (result.id){
            const result = await users.findOne({
                where:{  
                    password : password,
                    email: email 
                }, attributes : ['username', 'email', 'password'],
            })
            console.log(result, 'Text')
            if(result)
                return res.status(200).json({
                    status : 'Founded',
                    message: 'Logged',
                    result : result,
            })
        }
        res.status(404).json({
            status: 'Not Found',
            message : 'User Email and Password Not Found'
        })
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.query
        const result = await users.findAll({
            where : {
                id: id
            },
            attributes : ['id', 'username', 'professi' ]
        })
        if(result.lenght > 0){
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(404).json({
            status: 'Not Found',
            message : 'User Email and Password Not Found'
        })
    }
}	

const getUserImgs = async (req, res) => {
    try {
        const { idUser, idImage, idImgStart } = req.query
        const result = images.findAll({
            where:{
                id : idImage,
                id_user : idUser,
                attributes : [''],
                limit: 3
         }
        })
        res.status(200).json(result)
    } catch (error) { 
        res.status(500).json({
            status : 'Failed',
            messages : error
        })
    }
} 

// function to retrieve an image from image table based onthe provided image id
// The parameter needed is image id with query idImage 
// The return of function is JSON 
const getImgs = async (req, res) => {
    const { idImage, direction } = req.query
    if (!idImage || !direction){
        return res.status(400).json({message: 'idImage or direction is required'})
    }
    const operator = direction === 'Forward'? Op.gte : Op.lte;
    const order = direction === 'Forward'? 'DESC' : 'ASC';
    try {
        const result = await images.findAll({
            where:{
                id : {
                    [operator] : idImage
                }
            },    
            attributes : ['id','id_user', 'image_name', 'description'],
            limit:3
        })
        const isLast = await images.findAll({
            where : {
                id : {
                    [operator] : idImage
                }
            }, 
            attributes : ['id'],
            order : [['id', order]],
            limit : 4
        })
        const isLastResult = isLast.length < 4 ;
        res.status(200).json({
            isLast : isLastResult,
            result : result
        })
    } catch (error) { 
        res.status(500).json({
            messages : 'Internal server error'
        })
    }
} 

const getUserImgDetail = async (req, res) => {
    try {
        const { idUser, idImage } = req.query
        const result = await images.findAll({where : {id : idImage,id_user : idUser}}) 
        res.status(200).json(result)
    } catch (error) { 
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 

const getCollection = async (req, res) => {
    try {
        const {idUser, } = req.query
        const result = await collections.findAll({
            where : {
                id_user : idUser 
            }, attributes : ['id_user_collected','id_image']
        })
        res.status(200).json(result)
        // Perbaiki Lagi
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 

const getCountrysList = async (req, res) => {
    try {
        const {} = req.query
        const results = await countrys.findAll()
        res.status(200).json(results)
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 

const getNotifications = async (req, res) => {
    try {
        const { idUser } = req.query
        const results = await notifications.findAll({
            where: {
                id_user : idUser
            }, attributes : ['title', 'message', 'timestamp']})
            res.status(200).json(results)
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 

const getCountFollowers = async (req, res) => {
    try {
        const { idUser } = req.query
        const { count, row } = await followers.findAndCountAll({
            id_followed_user : idUser
        })
        res.status(200).json(count)
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
}

const getCountFolloweds = async (req, res) => {
    try {
        const { idUser } = req.query
        const { count, row } = await followers.findAndCountAll({
            where : {
                id_follower_user:idUser
            }
        }) 
        res.status(200).json(count)
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 

const getListFollowers = async (req, res) => {
    try {
        const { idUser } = req.query
        const result = await followers.findAll({
            where: {
                id_followed_user: idUser
            },attributes : ['id_following_user']
        }) 
        res.status(500).json(result)
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 
const getListFollowed = async (req, res) => {
    try {
        const { idUser } = req.query
        const result = await followers.findAll({
            where : {
                id_followed_user : idUser
            }
        })
        res.status(200).json(result) 
        // 
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 
const getLike = async (req, res) => {
    try {
        const { idUser, idImage } = req.query
        const result = await likes.findAll({
            id_user_like:idUser,
            id_image:idImage
        })
        res.status(200).json({
            status: 'Found',
            message: `idUser : ${idUser} Liked Image with idImage : ${idImage}`
        })
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
}
const getLastImage = async (req, res) => {
    try {
        const { idUser, imageName } = req.query
        const result =  await images.findOne({
            where : {
                id_user: idUser, image_name : imageName
            }, order : [['id_image', 'DESC']]
        })
        if (result === 1) {
            return res.status(200).json({
                status : 'Found'
            })
        }
        res.status(300).json({
            status : 'Not found'
        })
    } catch (error) {
        
    }
}

const validationImageName = async (req, res) => {
    try {
        const idUser = req.query.idUser
        const imageName = req.query.imageName
        const result = await images.findAll({
            where : {
                id_user : idUser, image_name : imageName
            }
        })
        if (result >= 1) {
            return res.status(200).json({
                status : 'image name more than 1'
            })}
        res.status(200).json({
            status : 'image name not found'
        })
    } catch (error) {
        
    }
}

const createNotifRecord = async (req, res) => {
    try {
        const {} = req.query;
        result = await notifications.create({})
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
}
const createImageRecord = async (req, res) => {
    try {
        const userId = req.body.idUser;
        const imageName = req.body.imageName;
        console.log(req.body.idUser);

        const validationName = await images.findOne({
            where: { id_user: userId, image_name: imageName },
            order: [['id', 'DESC']]
        });

        if (!validationName) {       
            console.log('masuk 1')         
            let lastId = await images.findOne({
                 order: [['id', 'DESC']]
            });
            let newLastId = lastId ? lastId.id + 1 : 1; 
            images.create({id : newLastId ,id_user : userId, image_name : imageName})

            return newLastId
        }
        console.log('masuk2')
        return validationName
    } catch (error) {
        res.status(404).json({
            status : 'Failed',
            messages : error
        })
    }
} 
const createMessageRecord = async (req, res) => {
    try {
        const {} = req.query;
        result = await messages.create({})
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 
const createFormContactUs = async (req, res) => {
    try {
        const {} = req.query;
        result = await contactus.create({

        })
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 
const createFollower = async (req, res) => {
    try {
        const { idUser ,idUserFollowed} = req.query;
        result = await followers.create({id : '',id_following_user: idUser ,id_followed_user : idUserFollowed})
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : error
        })
    }
} 
const createCollection = async (req, res) => {
    try {
        const { idUser, iduserCollected , idImage } = req.query;
        result = await collections.create({
            where : {
                id_user: idUser, id_user_collected : iduserCollected, id_image : idImage
            }
        })
    } catch (error) {
        res.status(404).json({
            status : 'Failed',
            messages : error
        })
    }
}

const deleteFollower = async (req, res) => {
    try {
        const {idUser, idUserFollowed} = req.query;
        result = await followers.destroy({
            where:{
                id_following_user:idUser, id_followed_user:idUserFollowed
            }})
        if(result === 0){
            return res.status().json({
                status : 'Not Found',
                messages : 'Record Not Found'
            })
        }
        res.status(200).json({
            status :'success',
            messages: `id user :${idUser} Success unfollow user with id${idUserFollowed}`
        })
    } catch (error) {
        res.status().json({
            status : 'Failed',
            messages : 'Failed Unfollow or Deleting record'
        })
    }
}

const deleteToken = async (id_user, token) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = { 
    createUser, 
    getUserValidation,
    getUsers, 
    getUser, 
    getImgs,
    getUserImgs,
    getUserImgDetail,
    getCountrysList,
    getCollection,
    getLike,
    getNotifications,
    getCountFollowers,
    getCountFolloweds,
    getListFollowed,
    getListFollowers,
    createNotifRecord,
    createImageRecord,
    createFormContactUs,
    createFollower,
    createMessageRecord,
    createCollection,
    deleteFollower,
    getLastImage,
    validationImageName

}