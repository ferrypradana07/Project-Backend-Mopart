const express = require('express')

const countryController = require('../controller/countryController')

const router = express.Router();

// get all country name list no need request body just api
router.get('/', countryController.getCountrysList)

module.exports = router;