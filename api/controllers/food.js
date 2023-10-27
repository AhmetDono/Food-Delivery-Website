const Food = require('../models/food');
const Logger = require('./logger')

//!foto ekleme gelicek
const createFood = async(req,res)=>{
    const newFood = new Food(req.body)
    try{
        const savedFood = await newFood.save();
        Logger.foodLogger.log('info',`[Food Name:${newFood.foodName}] [Event Type: Create Food] [Success Status: Successful]`);
        res.status(200).json(savedFood)
    }catch(err){
        Logger.foodLogger.log('error',`[Event Type: Create Food] [Success Status: Unsuccessful] [Error Message: The Food could not be created]`);
        res.status(500).json(err)
    }
}
//!foto silme gelicek
const deleteFood = async(req,res)=>{
    try{
        await Food.findByIdAndDelete(req.params.id);
        Logger.foodLogger.log('info',`[Event Type: Delete Food] [Success Status: Successful]`);
        res.status(200).json("Food has been deleted");
    }catch(err){
        Logger.foodLogger.log('error',`[Event Type: Delete Food] [Success Status: Unsuccessful] [Error Message: The Food could not be deleted]`);
        res.status(500).json(err);
    }
}
//!foto guncelleme gelicek
const updateFood = async(req,res)=>{
    try {
        const updatedFood = await Food.findByIdAndUpdate(
          req.params.id,{
            $set: req.body,
          },{ new: true }
        );
        Logger.foodLogger.log('info',`[Food Name:${updatedFood.foodName}] [Event Type: Update Food] [Success Status: Successful]`);
        res.status(200).json(updatedFood);
      } catch (err) {
        //! updatedFood buraya gelcek sekilde guncellenmeli once id bul sonra id ye gore sil
        Logger.foodLogger.log('error',`[Event Type: Update Food] [Success Status: Unsuccessful] [Error Message: The Food could not be updated]`);
        res.status(500).json(err);
      }
}

const getAllFood = async(req,res)=>{
    try {
        const foods = await Food.find()
        res.status(200).json(foods);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFood = async(req,res)=>{
    try{
        const food = await Food.findById(req.params.id);
        res.status(200).json(food);
    }catch(err){
        res.status(500).json(err);
    }
}




module.exports = {createFood,deleteFood,updateFood,getFood,getAllFood}