// const {users, followers, collections, contactus, countrys, likes, images, messages, notifications, userToken} = require('../model/userModel')

// // Status response back only { Success, Created, Failed and Not Found}  
// // Success code is 200, Failed code status is 400 and Not Found code status is 404
// // buat di server.jsnya ulang lagi

const { signToken } = require('../Middleware/authMiddleware')
const { Op, where } = require('sequelize')
const { users } = require('../model/userModel')
const { domain } = require('../config/domain')
const bcrypt = require('bcrypt')

// bcrypt is required to prevent someone see password include admin who able to see database 

const createUser = async (req, res, next) => {
    try {
        const {username , email, password} = req.body
        console.log(username, email, password)
        const validation = await getUserValidationForGetId(email, password)
        if(validation.id){
            console.log('email already exist')
            return res.status(400).json({status : "failed", message : 'Email already registered'})
        }
        const passwordEncrypted = await bcrypt.hash(password, 10)

        const newUser = await users.create({
            username : username,
            email : email, 
            password : passwordEncrypted
        })

        const token = signToken({id : newUser.id, username : newUser.username, role : 'user'})
        req.token = token
        req.userId = newUser.id
        req.username = newUser.username
        req.photoprofile = newUser.photo_profile
        req.message = 'Berhasil membuat akun'
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const getUserValidationForGetId = async (email, password) => {
    try {
        const result = await users.findOne({
            where:{  
                email: email
            }, attributes : ['id', 'password'],
        })
        if(result){
            const validationPassword = await bcrypt.compare(password, result.password)
            // const validationPassword = result.password === password? true : false;
            if(validationPassword){
                return result
            }
        } else {
            return 'error'
        }
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

const getProfileandName = async (req, res) => {
        try {
        const listuser = req.resultlistroom.map(result => result.room.usertarget)
        console.log(listuser)
        const resultphoto = await users.findAll({
            where : {
                id : {
                    [Op.in] : listuser,
                }
            },
            attributes : ["photo_profile", "username"]
        })
        const arrayresultlistroom = req.resultlistroom.map((result, index) => ({
            lastmassage : result.message ? result.message : null ,
            room : result.room,
            username : resultphoto[index].username,
            photo : resultphoto[index].photo_profile? `${domain}/api/image/${result.room.usertarget}/profile.jpg` : null
        }))
        // console.log(arrayresultlistroom)
        // console.log(arrayresultlistroom.reverse())
        res.status(200).json({listroom : arrayresultlistroom.reverse()})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}
const UpdateDataUser = async (req, res) => {
    try {
        const { instagram, youtube, facebook, professi, country } = req.query?? {}
        const userId = req.decoded.id
        console.log(instagram, youtube, facebook, professi)
        const user = await users.findOne({
            where : {
                id : userId
            }
        })
        if (country) {
            await user.update({country : country})
        }
        if (professi) {
            await user.update({professi : professi})
        }
        if (instagram) {
            await user.update({instagram : instagram})
        }
        if (facebook) {
            await user.update({facebook : facebook})
        }
        if (youtube) {
            await user.update({youtube : youtube})
        }
        await user.save()
        return res.status(200).json({status: "success", message : "berhasil menggubah profile"})
    } catch (error) {
        console.log(error)
    }
} 

const getUserValidation = async (req, res, next) => {
    try {
        const { email, password } = req.body ?? req.query

        console.log(req.body)
        console.log(req.query)

        console.log(" Email : ",email," Password : ", password)
        if(!email || !password){
            return res.status(400).json({
                status : "error",
                message : 'email or password is required'
            })
        }
        console.log(" Email : ",email," Password : ", password)
        const validation = await getUserValidationForGetId(email, password)
        console.log("Validation Id : ",validation.id)
        if (validation.id){
            const result = await users.findOne({
                where:{  
                    id: validation.id 
                }, attributes : ['id','username','photo_profile'],
            })
            console.log(result.username)
            const token = signToken({id: validation.id, username: result.username, role : 'user'})
            req.token = token
            req.userId = validation.id
            req.username = result.username
            req.photoprofile = result.photo_profile
            req.message = 'user successfully logged'
            return next()
        }
        res.status(404).json({
            status: 'not found',
            message : 'email or password is havent registerd'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

// getting users data
const getDataUser = async (req, res, next) => {
    try {
        const { userId } = req.query??{}
        if (!userId) {
            return res.status(400).json({
                status : 'failed',
                message : 'userId is required'
            })
        }
        const result = await users.findOne({
            where : {
                id: userId
            },
            attributes : ['id', 'username', 'photo_profile','country', 'professi','created','facebook','instagram','x','whatsapp','youtube']
        })
        if (result) {
            console.log(result)
            req.userdata = result
            return next()
        }
        res.status(404).json({
            status: 'failed',
            message: 'User is not found'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const getUsers = async (req, res) => {
    const { startUserId, direction } = req.query??{}
    if (!startUserId || !direction){
        return res.status(400).json({message: 'startUserId or direction is required'})
    }
    const operator = direction === 'forward'? Op.gte : Op.lte;
    try {
        const result = await users.findAll({
            where:{
                id : {
                    [operator] : startUserId
                }
            },    
            attributes : ['id', 'username', 'photo_profile'],
            limit: 17
        })
        const isLastResult = result.length < 17 
        if (isLastResult ===  false) {
            result.pop()
        }
        const array = result.map(user => ({
            id : user.id,
            username : user.username,
            photo : user.photo_profile? `${domain}/api/image/${user.id}/profile.jpg` : '' 
        }))
        res.status(200).json({
            isLast : isLastResult,
            result : array
        })
    } catch (error) { 
        res.status(500).json({
            messages : 'Internal server error'
        })
    }
} 

const EmailValidation = async (req, res, next) => {
    try {
        const { userMail } = req.body??{}
        console.log("User Mail : ", userMail)
        if (!userMail) {
            return res.status(400).json({
                status : "failed",
                message : " Email is required"})
        }
        const validation = users.findOne({
            where : {
                email : userMail
            }
        })
        if (validation) {
            return next()
        }
        return res.status(200).json({status : 'failed', message : "Email is not found"})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

const UpdateNewUserPassword = async (req, res) => {
    try {
        const { newPassword } = req.body??{}
        const userMail = req.decodedTokenMail.userMail
        if (!newPassword) {
            return res.status(400).json({message: 'password is required'})
        }
        const validation = await users.findOne({
            where : {
                email : userMail
            },
            attributes : ["password"]
        })
        let NewEncryptedPassword;
        if (validation) {
            console.log(validation)
            console.log("=====", validation.password, newPassword)
            const validationPassword = await bcrypt.compare(newPassword, validation.password)
            if (validationPassword) {
                return res.status(400).json({message : 'Tolong masukan kata sandi baru'})
            }
            NewEncryptedPassword = await bcrypt.hash(newPassword, 10)
            // if (validation.password === newPassword ) {
            //     return res.status(400).json({message : 'Tolong masukan password baru'})
            // }
        }
        const user = await users.findOne({
            where : {
                email : userMail
            }
        })       
        await user.update({password : NewEncryptedPassword})
        await user.save()
        return res.status(200).json({message : 'Berhasil menggubah sandi baru' })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'
        })
    }
}

module.exports = { createUser, getUserValidation, getDataUser ,getUsers, EmailValidation, UpdateNewUserPassword, getProfileandName, UpdateDataUser }