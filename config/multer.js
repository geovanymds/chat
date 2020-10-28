const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'temp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {cb(err);}
        file.fullname = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.fullname);
      });
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket:  'pictures-upload-chatredes',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    fullname: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {cb(err);}
        const filename = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, filename);
      });
    },
  })
};

module.exports = {
  dest: path.resolve(__dirname, '..', 'temp', 'uploads'),
  storage: storageTypes["local"],

  limits:{
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ];

    if (allowedMimes.includes(file.mimetype)){cb(null, true);} 
    else {cb(new Error("Invalid File Type!"))}  
  }
}