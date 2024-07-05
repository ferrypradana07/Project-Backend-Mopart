const nodemailer = require('nodemailer')
const {webdomain} = require('../config/domain')
const {user_email, pass_email} = require('../config/mailAccount')

const sendMail = async (req, res, next) => {
    const { userMail }= req.body ?? {}
    console.log(req.query)
    console.log(req.body)
    const token = req.tokenMail
    console.log(userMail)
    if (!userMail) {
        return res.status(400).json({
            message : "Email is required"
        })
    }
    let transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth : {
            user : user_email,
            pass : pass_email
        }
    })
    console.log(`${ webdomain }/update?token=${token}`)
    let mailOption = {
        from : user_email,
        to : `${userMail}`,
        subject : "verifikasi token ",
        text : ` Silahkan klik link berikut ini :  
            https://${ webdomain }/password-baru?token=${token}
            note : jangan menyebarkan link diatas karena bersifat rahasia dan token hanya berlaku selama 15 menit`
    }
    
    try {
        let info = await transporter.sendMail(mailOption)
        console.log("Email response : ", info.response)
        return res.status(200).json({
            status : "success", 
            message : "berhasil mengirim mail"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status : "error", 
            message : "gagal mengirim mail"
        })
    } 
}

module.exports = { sendMail }