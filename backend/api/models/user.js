const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("user", UserSchema);
