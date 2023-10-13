const mongoose = require("mongoose"); // Import the mongoose connection

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  credits: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
