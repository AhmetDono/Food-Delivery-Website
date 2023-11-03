const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", },
    foods: [
        {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
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
    address:{type:String ,required:true}
  },
  { timestamps: true }
);


module.exports = mongoose.model("order", orderSchema);