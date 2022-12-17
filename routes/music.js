const express = require('express');
const router = express.Router();
const upload1 = require("../utils/MusicUploader");
// const upload2 = require("../utils/MusicCoverPage");
// const mongoose = require('mongoose');
const { ClientError } = require("../handlers/Error");
const { Uploader, Fetcher } = require("../controller/controller");
// const Auth = require('../Middleware/Auth');
// const User = require('../models/User');


router.get('/', async (req, res, next) => {
  try {
    let resp = await Fetcher(req);
    // console.log("res : ",resp);
    res.status(200).json({
      status: "success",
      data: resp
    });

  } catch (err) {
    console.log("in the files router : ", err);
    return next(err);
  }
});

//uploading file to the server
router.post("/upload", [upload1.single('music')], async (req, res, next) => {
  try {
    console.log("files : ", req.file);
    await Uploader(req);
    return res.status(201).json({
      status: "success",
      msg: "new music uploaded successfully.."
    });
  } catch (err) {
    console.log("errrrrrrrrrrrrr : ", err);
    return next(err);
  }
});

//downloading a particular file from the server
router.get('/:fname', async (req, res, next) => {
  //requiring the bucket to fetch the files
  const { bucket } = require("../utils/Bucket");
  try {
    console.log("range : ", req.headers.range);
    const file = await bucket.find({ filename: req.params.fname }).toArray();
    console.log("name : ", file);
    if (file.length === 0) {
      return next(new ClientError('no such file exists...'));
    }
    if (req.headers.range) {
      const parts = req.headers.range.replace(/bytes=/, "").split("-");
      const beg = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : beg + 261120;
      const chunkSize = (end - beg) + 1;
      const header = {
        'Content-Range': `bytes ${beg}-${end}/${file[0].length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': file[0].contentType,
      };
      // res.writeHead(206, header);
      //piping the file chunks to the response
      bucket.openDownloadStreamByName(req.params.fname).pipe(res);
    }

    //piping the file chunks to the response
    // bucket.openDownloadStreamByName(req.params.fname).pipe(res);

  } catch (err) {
    console.log("error : ", err);
    return next(err);
  }
});

//deleting a particular file
// router.delete("/delete/:id",async(req,res,next)=>{
//   const id = mongoose.Types.ObjectId(req.params.id);
//   const {bucket} = require("../utils/Bucket");
//   try{
//    await bucket.delete(id);
//     await DeleteFile(req);
//     return res.status(200).json({
//        status : "success",
//        msg : "file deleted successfully.."
//      });
//   }catch(err){
//      console.log("errrrrrrrrrrrrr : ",err);
//      return next(err);
//   }
// });


module.exports = router;

