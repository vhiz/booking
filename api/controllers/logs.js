const { Logs } = require("../model/Logs");

const getAllLogs = async (req, res) => {
  const list = await Logs.find();
  res.status(200).json(list);
};

module.exports = { getAllLogs };
