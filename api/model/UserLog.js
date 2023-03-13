const { Schema, model } = require("mongoose");

const userLogSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hotel: {
      type: String,
      required: true,
    },
    room: [{ number: String, unavialableDates: { type: [Date] } }],
  },
  { timestamps: true }
);
const UserLog = model("UserLog", userLogSchema);

module.exports = { UserLog };
