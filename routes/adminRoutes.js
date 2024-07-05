const express = require('express')


const { veryfyToken , OptionalValidationToken} = require('../Middleware/authMiddleware')
const adminController = require('../controller/adminController')
const adminTokenController = require('../controller/adminTokenController')

const router = express.Router();

module.exports = router;