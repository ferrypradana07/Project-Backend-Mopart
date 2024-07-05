const express = require('express')

const developerController = require('../controller/developerController')

const router = express.Router();

// get all developer list no need request body just api
router.get('/', developerController.getDevList)

module.exports = router;