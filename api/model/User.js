const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);

module.exports = { User };
