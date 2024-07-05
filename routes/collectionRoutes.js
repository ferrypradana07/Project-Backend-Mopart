const express = require('express')


const { veryfyToken , OptionalValidationToken} = require('../Middleware/authMiddleware')
const imageController = require('../controller/imageController')
const collectionController = require('../controller/collectionController')

const router = express.Router();

// create collection required imageId, token
router.put('/',veryfyToken, imageController.getImageOwnerIdByImageId, collectionController.createCollection)

// delete collection required imageId and token
router.delete('/',veryfyToken, imageController.getImageOwnerIdByImageId,collectionController.deleteCollection)


// create collection required imageId, token
router.get('/',collectionController.getListImageCollection, imageController.getUserCollectionImage)

module.exports = router;