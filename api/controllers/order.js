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
    const order = await Order.find({ userID: req.params.userID });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAlluserOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid; //pid = product id
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      //!Stage Operator=$match/group/sort/count/limit
      {
        $match: {
            //!Bu aşama createdAt alanının, belirtilen previousMonth değişkeninin değerinden
            //!büyük veya eşit olduğu belgeleri seçer. Bu, belirli bir zaman aralığına ait
            //!siparişleri seçmeyi amaçlar. Ayrıca, isteğe bağlı olarak productId değişkeni mevcutsa,
            //!products alanında bu productId'yi içeren belgeleri de seçer. Bu, belirli bir ürünle ilgili siparişleri sorgulamayı amaçlar.
             //!Örnek olarak, createdAt alanı geçerli ayın başından daha büyük veya eşit olan ve ayrıca products alanında belirli bir productId'yi içeren siparişleri seçmeyi sağlar.
          createdAt: { $gte: previousMonth },
          ...(productId && { //! kasim ayinda ki orderlari tutuyo
            products: { $elementMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" }, //!createdAt kismindan ay bilgisini cekiyor
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
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
  getMonthlyIncome,
};
