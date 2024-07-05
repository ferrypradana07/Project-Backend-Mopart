const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/secretKey')

const signToken = (user) => {
    if(!user.id || !user.username || !user.role){
        return "Data is invalid"
    }
    const token = jwt.sign(user, secretKey, { expiresIn : '240h' })
    return token
}

const veryfyToken = (req, res, next) => {
    // const {authstatus} = req.body?? req.query ; 
    const authstatus = req.query.authstatus !== undefined ?  req.query.authstatus : req.body.authstatus 
    console.log(req.body)
    console.log(req.query)
    console.log("auth :" , authstatus)
    if (!authstatus) {
        return res.status(400).json({
            status: "failed", 
            message : "authstatus is required"
        })
    }
    if (authstatus === "false") {
        return next()
    }
    const token = req.query.token ? req.query.token : req.body.token
    if(!token){
        return res.status(400).json({message : 'token is missing'});
    }
    console.log(secretKey)
    try {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return
            }
            if (!decoded.id || !decoded.username || !decoded.role) {
                return
            }
            return req.decoded = decoded
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({status : 'error' , message: 'internal was error'})
    }   
    if (!req.decoded) {
        return res.status(400).json({status : 'error' , message: 'token is invalid'})
    }
    return next()
}

const createTokenUpdatePassword = (req, res, next) => {
    const { userMail } = req.body?? {}
    if (!userMail) {
        return res.status(400).json({
            status : "failed",
            message : "userMail is required"
        })
    }
    const token = jwt.sign({userMail : userMail}, secretKey, {expiresIn : "15m"})
    if (!token) {
        return res.status(500).json({
            message : "internal was error"
        })
    } 
    next()
}

const veryfyTokenUpdatePassword = (req, res, next) => {
    const { tokenMail } = req.body?? {}
    if (!tokenMail) {
        return res.status(400).json({
            status : "failed",
            message : "tokenMail is required"
        })
    }
    try {
        jwt.verify(tokenMail, secretKey, (err, decoded) => {
            if (err) {
                console.log(err)
            }
            if (decoded.mail ) {
                return
            }
            return req.decoded = decoded
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message : "internal was error"
        })
    }
    if (!req.decoded) {
        return res.status(400).json({
            status : "error",
            message : "token is invalid"
        })
    }
}

const OptionalValidationToken = (req, res, next) => {
    console.log(req.body)
    console.log(req.query)
    const { authstatus } = req.query
    if (authstatus === 'false' || !authstatus ) {
        return next()
    }
    const tokenquery = req.query.token
    const token = tokenquery ? tokenquery : req.body.token ;
    // const now = new DATE.currenttimw
    console.log(token)
    if(!token){
        return res.status(400).json({message : 'Token is missing'});
    }
    console.log(secretKey)
    try {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log(decoded,'e',err)
                return 'token is invalid'
            }
            if (!decoded.id || !decoded.username || !decoded.role) {
                console.log(decoded,'w',err)
                return 'token is invalid'
            }
            return req.decoded = decoded
        })
    } catch (error) {
        return "error"
    }   
    if (!req.decoded) {
        return res.status(400).json({status : 'error', message: 'token is invalid'})
    }
    return next()
}

module.exports = { veryfyToken, signToken ,OptionalValidationToken, createTokenUpdatePassword, veryfyTokenUpdatePassword}