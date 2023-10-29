const User = require("../models/user");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto");
const Logger = require("./logger");

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    Logger.userLogger.log(
      "info",
      `[Event Type: Delete User] [Success Status: Successful]`
    );
    res.status(200).json("User has been deleted");
  } catch (err) {
    Logger.userLogger.log(
      "error",
      `[Event Type: Delete User] [Success Status: Unsuccessful] [Error Message: User could not be deleted]`
    );
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    Logger.userLogger.log(
      "info",
      `[User Name:${updatedUser.userName}] [Event Type: Update User] [Success Status: Successful]`
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    Logger.userLogger.log(
      "error",
      `[Event Type: Update User] [Success Status: Unsuccessful] [Error Message: User could not be updated]`
    );
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAlluser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query //query new true ise son kayit olan 5 kullanciyi donduruyor
      ? await User.find().sort({ _id: -1 }).limit(10)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const monthlyUserInfo = async (req, res) => {
  try {
    const userCount = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
        },
      },
      {
        $group: {
          _id: null,
          data: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          data: {
            $map: {
              input: "$data",
              as: "current",
              in: {
                year: "$$current.year",
                month: "$$current.month",
                count: "$$current.count",
                prevCount: {
                  $cond: [
                    { $eq: [{ $indexOfArray: ["$data", "$$current"] }, 0] },
                    0,
                    {
                      $arrayElemAt: [
                        "$data.count",
                        {
                          $subtract: [
                            { $indexOfArray: ["$data", "$$current"] },
                            1,
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
    ]);
    res.status(200).json(userCount);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  deleteUser,
  updateUser,
  getUser,
  getAlluser,
  monthlyUserInfo,
};
