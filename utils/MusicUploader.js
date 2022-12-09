//uploading the files to gridfs using multer
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const path = require('path');

const storage = new GridFsStorage({
    url: process.env.DATABASE,
    file: (req, u_file) => {
        return new Promise((resolve, reject) => {
            try {
                const file_name = req.body.filename.trim() + '@' + Date.now();
                console.log("hello aaya");

                //attaching the property to the request object
                req.musicfilename = file_name;
                console.log("name of the file music file: ", file_name);
                req.musicextension = path.extname(u_file.originalname).slice(1,);

                const fileInfo = {
                    filename: file_name,
                    bucketName: "music"
                }
                //uploading the files to gridfs
                resolve(fileInfo);
            } catch (err) {
                console.log("err in the music uploader: ", err);
                reject(err);
            }
        });
    }
});

const uploadMusic = multer({ storage });

module.exports = uploadMusic;