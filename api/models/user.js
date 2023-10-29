const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:Number,
            unique:true
        }
        ,
        address:{
            streetAddress:{
                type:String,
            },
            city:{
                type:String,
            },
            postalCode:{
                type:Number,
            },
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        img:{
            type:String
        },
    },
    {timestamps:true}
)

module.exports = mongoose.model("user",userSchema)