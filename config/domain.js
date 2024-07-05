const {portNumber} = require('./port')
require('dotenv').config()

// const domain = `localhost:${portNumber}` 
const domain = process.env.WEB_DOMAIN 
const webdomain = process.env.WEB_DOMAIN

module.exports = { domain, webdomain }