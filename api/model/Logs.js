const { Schema, model } = require("mongoose");

const logSchema = new Schema(
  {
    msg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Logs = model("Logs", logSchema);

module.exports = { Logs };
