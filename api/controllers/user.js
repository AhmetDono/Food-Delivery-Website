const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto');
const Logger = require('./logger')

//!resim silme
const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        Logger.userLogger.log('info',`[Event Type: Delete User] [Success Status: Successful]`);
        res.status(200).json("User has been deleted");
    }catch(err){
        Logger.userLogger.log('error',`[Event Type: Delete User] [Success Status: Unsuccessful] [Error Message: User could not be deleted]`);
        res.status(500).json(err);
    }
}
//!resim guncelleme
const updateUser = async(req,res)=>{
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
      }
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,{
            $set: req.body,
          },{ new: true }
        );
        Logger.userLogger.log('info',`[User Name:${updatedUser.userName}] [Event Type: Update User] [Success Status: Successful]`);
        res.status(200).json(updatedUser);
      } catch (err) {
        Logger.userLogger.log('error',`[Event Type: Update User] [Success Status: Unsuccessful] [Error Message: User could not be updated]`);
        res.status(500).json(err);
      }
}

const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json({others});
    }catch(err){
        res.status(500).json(err);
    }
}

const getAlluser = async(req,res)=>{
    const query = req.query.new;
    try {
      const users = query  //query new true ise son kayit olan 5 kullanciyi donduruyor
        ? await User.find().sort({ _id: -1 }).limit(10)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}


    
module.exports = {deleteUser,updateUser,getUser,getAlluser}