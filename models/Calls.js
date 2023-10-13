const mongoose = require("mongoose"); // Import the mongoose connection

const callSchema = new mongoose.Schema({
  callBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  callTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  duration: { type: String },
});

const Calls = mongoose.model("Calls", callSchema);

module.exports = Calls;
