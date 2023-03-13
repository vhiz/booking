const { verify } = require("jsonwebtoken");
const { Logs } = require("../model/Logs");
const { User } = require("../model/User");
require("dotenv/config");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Authenticated");

  verify(token, process.env.KEY, async (err, payload) => {
    if (err) return res.status(403).json("Token Not Valid");
    const userId = payload.id;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json("User not found");

      const { password, isAdmin, ...other } = user._doc;
      res.status(200).json(other);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not Authenticated");

  // verify(token, process.env.KEY, async (err, payload) => {
  //   if (err) return res.status(403).json("Token Not Valid");

    try {
      const user = await User.findByIdAndDelete(req.params.id);

      await Logs.create({
        msg: `${user.username} was deleted at -`,
      });
      res.status(200).json("deleted succesfully");
    } catch (error) {
      res.status(500).json(error);
    }
  // });
};

const updateUser = async (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not Authenticated");

  // verify(token, process.env.KEY, async (err, payload) => {
  //   if (err) return res.status(403).json("Token Not Valid");
  //   const userId = payload.id;
    try {
      const update = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true }
      );

      const { password, isAdmin, ...other } = update._doc;
      res.status(200).json(other);
    } catch (error) {
      res.status(500).json(error);
    }
  // });
};
module.exports = { getUser, getUsers, deleteUser, updateUser, getUserById };
