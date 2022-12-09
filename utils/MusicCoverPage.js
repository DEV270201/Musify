//here i will use multer for uploading the cover page of the music
const multer = require('multer');
const path = require('path');
const { ClientError } = require("../handlers/Error");

const storage = multer.diskStorage({
    destination: function (req, file, call_back) {
        call_back(null, "./MusicCover/")
    },
    filename: function (req, file, call_back) {
        req.coverfilename = req.body.filename;
        call_back(null, req.coverfilename);   //setting the new file name stored in the upload file
    }
})

const file_filter = (req, file, cb) => {
    let extensions = /jpeg|jpg|png/;

    const extname = extensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = extensions.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new ClientError('Please upload images only!'));
    }
}

var upload = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: file_filter });

module.exports = upload;