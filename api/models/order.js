const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, //! user id gelicek
    foods: [
      {
        foodId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          default: "medium",
        },
      },
    ],
    total:{
      type: Number,
      default:0
    },
    address:{type:String ,required:true} //! address id gelicek
  },
  { timestamps: true }
);


module.exports = mongoose.model("order", orderSchema);