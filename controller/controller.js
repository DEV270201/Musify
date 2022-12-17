const Music = require('../models/Music');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { ClientError } = require('../handlers/Error');
const { promisify } = require('util');

//fetching all the music files
exports.Fetcher = async (req) => {
  try {
    let files = await Music.find();
    return files;
  } catch (err) {
    console.log("Error in fetcher controller: ", err);
    throw err;
  }
}

//uploading new files to the server
exports.Uploader = async(req)=>{
    try{
      let music = {
        filename:req.musicfilename,
        grid_file_id: req.file.id,
        filesize: req.file.size,
        filetype: req.musicextension,
        musician: req.body.musician,
        duration_in_seconds: req.body.duration_in_seconds,
        cover_img: req.body.cover_img
      }
      //saving the file in the database
      await Music.create(music);
      return;
    }catch(err){
        console.log("Error in uploader controller: ",err);
        throw err;
    }
}

//registering the user
// exports.RegisterUser = async(user)=>{
//   try{
//     //hashing the password
//      const salt = await bcrypt.genSalt(10);
//      user.password = await bcrypt.hash(user.password, salt);
//      await User.create({email : user.email,username : user.username,password : user.password});
//      return;
//   }catch(err){
//     console.log("Error in register controller : ",err);
//     throw err;
//   }
// }

//logging in the user
// exports.LoginUser = async (req,res)=>{
//   try{
//     const signJWT = async (user_id) => {
//       return await promisify(jwt.sign)({id : user_id}, process.env.JWT_SECRET);
//     };

//     let user_name = String(req.body.username);
//     let pass_word = String(req.body.password);

//     let user = await User.findOne({
//       $or : [
//         {
//           "username" : user_name
//         },
//         {
//           "email" : user_name
//         }
//       ]
//      });

//     if(!user){
//       throw new ClientError("Invalid credentials!");
//     }
//     const isPasswordMatch = await bcrypt.compare(
//       pass_word,
//       user.password
//     );
//     if (!isPasswordMatch) {
//        throw new ClientError("Invalid credentials!");
//     }

//     const token = await signJWT(user.id);

//     //it will set the cookie in the browser
//     res.cookie('s_Id', token, {
//       httpOnly: true,
//       expires : new Date(Date.now() + 8 * 3600000),
//       samesite : true
//     });

//     return;

//   }catch(err){
//     console.log("Error in login controller : ",err);
//     throw err;
//   }
// }

//deleting the file
// exports.DeleteFile = async(req)=>{
//   try{
//     //delete the file chunks
//     await File.deleteOne({grid_file_id:req.params.id});
//     return;
//   }catch(err){
//     console.log('in the delete file controller : ',err);
//     throw err;
//   }
// }


