const multer = require('multer');
const path = require('path');
const fs = require('fs');
const imageController = require('../controller/imageController');
const { users } = require('../model/userModel');
const { where } = require('sequelize');

// Destination and Filename Function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userPath = req.decoded.id;
        const uploadPath = path.join(__dirname, '../uploads', `${userPath}`);
        console.log(uploadPath)
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename:  async function (req, file, cb, ) {
        try {
            // image Name First after image
            //  multer need req body
            console.log('Filename Function', req.imageName)
            console.log(req.query.imageName)
            console.log(req.body.imageName)
            if (req.query.name) {
                const response = await users.findOne({
                    where : {
                        id : req.decoded.id
                    }}) 
                req.title = `${req.decoded.username} telah mengupload gambar baru`
                req.message = `${req.decoded.username} telah mengupload upload gambar baru`
                console.log(response.id, response)
                const fileName = req.query.name? 'photo_profile' : response.id;
                if(fileName === 'photo_profile'){
                    const isprofileexist = path.join(__dirname, '../uploads', `${req.decoded.id}`, 'profile')
                    const user = await users.findOne({
                        where : {
                            id : req.decoded.id
                        },
                        attributes : ["photo_profile"]                        
                    })
                    if (!user.photo_profile) {
                        await users.update({photo_profile : 1},
                            {where : {
                                id : req.decoded.id
                            }}
                        )
                    } else {
                        if (fs.existsSync(isprofileexist)) {
                            fs.unlink(isprofileexist, (err) => {
                               
                                if (err) {
                                    return cb(('Gagal mengupload gambar'));
                                }
                            })
                        }
                    }
                    return  cb(null, `profile.jpg`);
                }
                if (fileName !== 'photo_profile') {     
                    cb(null, `profile.jpg`);
                } else {
                    console.log('error')
                    cb(('Id gambar sudah tersedia'));
                }
            }
            const response = await imageController.createImageRecord(req)
            req.title = `${req.decoded.username} upload new image`
            req.message = `${req.decoded.username} upload new image`
            console.log(response.id, response)
            const fileName = req.body.name ? 'photo_profile' : response.id;
            if (fileName) {        
                cb(null, `${fileName}.jpg`);
            } else {
                console.log('error')
                cb(('image name id already exist'));
            }
        } catch (error) {
            console.log(error)
            cb('error');
        }
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
