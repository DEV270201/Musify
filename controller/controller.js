const Music = require('../models/Music');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { ClientError } = require('../handlers/Error');
const { promisify } = require('util');

//fetching all the music files
// exports.Fetcher = async(req)=>{
//   try {
//     let files = await File.find({isPrivate:false}).populate({path: 'uploadedBy',select : 'profile_pic username -_id'});
//     return files;
//   }catch(err){
//     console.log("Error in fetcher controller: ",err);
//     throw err;
//   }
// }

//uploading new files to the server
exports.Uploader = async(req)=>{
    try{
      let music = {
        filename:req.musicfilename,
        grid_file_id: req.file.id,
        filesize: req.file.size,
        filetype: req.musicextension,
        singer: req.body.singer,
        duration_in_seconds: req.body.duration_in_seconds
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

//getting the profile of the user
// exports.GetProfile = async(req)=>{
//   try{
//     let resp = await User.findById(req.user.id,{password:0});
//     return resp;
//   }catch(err){
//     console.log("in the get profile controller : ",err);
//     throw err;
//   }
// }

//getting the statistics
// exports.GetStatsFiles = async(req)=>{
//   try{
//     let {num_upload,num_download} = await User.findById(req.user.id);
//     let files = await File.find({uploadedBy:req.user.id}).populate({path: 'uploadedBy',select : 'profile_pic -_id'});
//     return{
//       stats: {
//         num_download,num_upload
//       },
//       files
//     }
//   }catch(err){
//     console.log("in the get statsfiles controller : ",err);
//     throw err;
//   }
// }

//deleting the profile image
// const deleteProfileImage = async(id)=>{
//   try{
//      await cloudinary.uploader.destroy(id);
//   }catch(err){
//     throw err;
//   }
// }

//updating the profile picture
// exports.UpdateProfile = async(req)=>{
//   try{
//     //  console.log("u: ",req.body.profilePicUrl);
//     //  console.log("d: ",process.env.DEFAULT);
//     // if(!(req.body.profilePicUrl === process.env.DEFAULT)){
//     //    console.log("aa gaya...");
//     //    await deleteProfileImage(req.body.publicId);
//     // }

//     //uploading the image to cloudinary
//     let file_dir = `profile_uploader/${req.fileName}`;
//     let {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
//       "public_id": file_dir,
//     });

//     //deleting the file from the local disk
//     fs.unlinkSync(req.file.path);

//     //uploading the link into the database
//     await User.findByIdAndUpdate(req.user.id,{profile_pic: secure_url,p_id: public_id});
//     return {url:secure_url,id:public_id};
//   }catch(err){
//     console.log("in the update profile controller : ",err);
//     throw err;
//   }
// }

// exports.DeleteProfile = async(req)=>{
//   try{
//     console.log("prof : ",req.body.publicId);
//     await deleteProfileImage(req.body.publicId);
//     let resp = await User.findByIdAndUpdate(req.user.id,{profile_pic: process.env.DEFAULT,p_id: null},{
//       new: true,
//       select: "profile_pic"
//     });
//     return resp;
//   }catch(err){
//     console.log('in the delete profile controller : ',err);
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

//fetching other users profile
// exports.GetOtherUserProfile = async(req)=>{
//   try{
//    //getting the data of the required user
//    let user = String(req.params.user);
//    let metadata = await User.findOne({username : user},{
//     password:0,
//     email:0
//    });
//    //getting the files of the required user
//    let files = await File.find({uploadedBy:metadata.id,isPrivate:false});
//    return {
//     userdata : metadata,
//     filedata : files
//    }
//   }catch(err){
//     console.log('in the others profile controller : ',err);
//     throw err;
//   }
// }

//updating the status of the file
// exports.updateStatus = async(req)=>{
//   try{
//     await File.findOneAndUpdate({filename:req.body.filename},{isPrivate:req.body.isPrivate})
//     return;
//   }catch(err){
//     console.log('in the update status controller : ',err);
//     throw err;
//   }
// }

