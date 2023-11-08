const Order = require("../models/order");
const Logger = require("./logger");

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    Logger.orderLogger.log(
      "info",
      `[Order ID: ${savedOrder._id}] [Event Type: Create Order] [Success Status: Successful]`
    );
    res.status(200).json(savedOrder);
  } catch (err) {
    Logger.orderLogger.log(
      "error",
      `[Event Type: Create Order] [Success Status: Unsuccessful] [Error Message: Order could not be created]`
    );
    res.status(500).json(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    Logger.orderLogger.log(
      "info",
      `[Event Type: Delete Order] [Success Status: Successful]`
    );
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    Logger.orderLogger.log(
      "error",
      `[Event Type: Delete Order] [Success Status: Unsuccessful] [Error Message: Order could not be deleted]`
    );
    res.status(500).json(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    Logger.orderLogger.log(
      "info",
      `[Order ID: ${updatedOrder._id}] [Event Type: Delete Order] [Success Status: Successful]`
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    Logger.orderLogger.log(
      "error",
      `[Event Type: Update Order] [Success Status: Unsuccessful] [Error Message: Order could not be updated]`
    );
    res.status(500).json(err);
  }
};

const getUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ userID: req.params.userId }).populate('foods.foodId').populate('userId');
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAlluserOrder = async (req,res) => {
  try {
    const orders = await Order.find({}).populate('foods.foodId').populate('userId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMonthlyTotalIncome = async (req, res) => {
  const productId = req.query.pid; //pid = product id
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      {
        $project: {
          _id: 1,
          total: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMonthlyOrderCount = async (req, res) => {
  const productId = req.query.pid; //pid = product id
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          orderCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          orderCount: 1,
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  getUserOrder,
  getAlluserOrder,
  getMonthlyTotalIncome,
  getMonthlyOrderCount,
};
