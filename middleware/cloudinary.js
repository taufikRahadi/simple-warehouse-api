const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const randomString = require('../helpers/random-string')

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user-profile',
        format: (req, file) => file.mimetype.split('/')[1],
        public_id: (req, file) => randomString(32)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') cb(null, true)
        else {
            return cb(new Error('Image Format not Supported'))
        }
    }
})

module.exports = upload
