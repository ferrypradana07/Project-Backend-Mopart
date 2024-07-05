const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/secretKey')

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
    } else  {
        req.tokenMail = token
        console.log(token)
        return next()
    }
}

const veryfyTokenUpdatePassword = (req, res, next) => {
    const { tokenMail } = req.body?? {}
    console.log("tokenMail : " , tokenMail)
    if (!tokenMail) {
        return res.status(400).json({
            status : "failed",
            message : "tokenMail is required"
        })
    }
    jwt.verify(tokenMail, secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                status : "error",
                message : "token is invalid"
            })
        }
        if (!decoded.userMail ) {
            return res.status(400).json({
                status : "error",
                message : "token is invalid"
            })
        }
        req.decodedTokenMail = decoded
        next()
    })
}

module.exports = { createTokenUpdatePassword, veryfyTokenUpdatePassword }