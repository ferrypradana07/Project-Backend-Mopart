const express = require('express')

const { veryfyToken , OptionalValidationToken} = require('../Middleware/authMiddleware')
const userTokenController = require('../controller/userTokenController')

const router = express.Router();

// delete token by userId
// router.delete('/api/user/unauthorization',  userTokenController.deleteTokenDB)
// router.delete('/api/user/unauthorization', (req, res) => {
//     res.status(200).json({status : 'success'})
// })
router.delete('/', veryfyToken, userTokenController.deleteTokenDB)

module.exports = router;