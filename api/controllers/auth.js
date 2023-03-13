const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { Logs } = require("../model/Logs");
const { User } = require("../model/User");
const moment = require('moment')
require("dotenv/config");

const register = async (req, res) => {
  const salt = genSaltSync(10);
  const hashed = hashSync(req.body.password, salt);

  const userExit = await User.findOne({ username: req.body.username });
  if (userExit) return res.status(409).json("User already exist");

  const emailExit = await User.findOne({ email: req.body.email });
  if (emailExit) return res.status(409).json("User already exists");
  try {
    const newUser = new User({
      username: req.body.username,
      password: hashed,
      email: req.body.email,
      img: req.body.img,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
    });

    await Logs.create({
      msg:`${newUser.username} was created at `
    })

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("User not found");

    const valid = compareSync(req.body.password, user.password);
    if (!valid) return res.status(401).json("Invalid input");

    const token = sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.KEY
    );
    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const adminLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("User not found");

    const valid = compareSync(req.body.password, user.password);
    if (!valid) return res.status(401).json("Invalid input");

    if (!user.isAdmin) return res.status(401).json("Not an admin");

    const token = sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.KEY
    );
    await Logs.create({
      msg:`${user.username} logged in at `
    })
    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const logout = async (req, res) => {
  res
    .cookie("accessToken", "", { httpOnly: true })
    .status(200)
    .json("loged out");
};

module.exports = { register, login, logout, adminLogin };
