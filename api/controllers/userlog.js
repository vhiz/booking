const { UserLog } = require("../model/UserLog");

const allUsersLog = async (req, res) => {
  const logs = await UserLog.find();

  res.status(200).json(logs);
};

const userLog = async (req, res) => {
  const userId = req.params.id;
  try {
    const userlogs = await UserLog.find({ userId: userId });
    res.status(200).json(userlogs);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { allUsersLog, userLog };
