require('dotenv').config()

const user_email = process.env.MAIL_USERNAME
const pass_email = process.env.MAIL_PASSWORD

module.exports = {user_email, pass_email}