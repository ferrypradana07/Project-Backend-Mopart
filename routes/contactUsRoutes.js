const express = require('express')

const contactusController = require('../controller/contactusController')

const router = express.Router();

// create form contact us
router.post('/', contactusController.createForm)

// getform contact us need id and name
router.get('/', contactusController.getForm)


module.exports = router;