const mongoose = require("mongoose");
// ! localde calisacak// ! localde calisacak// ! localde calisacak// ! localde calisacak
const cartSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);


module.exports = mongoose.model("cart", cartSchema);