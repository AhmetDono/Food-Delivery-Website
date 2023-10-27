const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
    {
        foodName:{
            type:String,
            required:true,
            unique:true
        },
        cat:{
            type:Array,
            required:true
        },
        desc:{
            type:String,
            required:true,
        },
        size:{
            type:Array,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        inStock:{
            type:Boolean,
            default:true
        },
        image:{
            type:String,
            // ! required olucak ilerde
        },

    },
    {timestamps:true}
)

module.exports = mongoose.model("food",foodSchema)