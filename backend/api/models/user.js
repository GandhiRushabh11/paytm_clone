const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide username"],
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    firstName: {
      type: String,
      trim: true,
      maxLength: 50,
      required: [true, "Please provide firstname"],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
      required: [true, "Please provide firstname"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Please provide password"],
      unique: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.getSignedjwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("user", UserSchema);
