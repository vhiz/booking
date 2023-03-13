const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [{ number: Number, unavialableDates: { type: [Date] } }],
  },
  { timestamps: true }
);
const Rooms = model("Rooms", roomSchema);

module.exports = { Rooms };
