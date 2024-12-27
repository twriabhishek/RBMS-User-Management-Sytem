const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 character"],
    minLength: [5, "Name should have more than 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should have contains atleat 8 character"],
  },
  role: {
    type: String,
    default: "User",
  },
});

module.exports = mongoose.model("User", userSchema);
