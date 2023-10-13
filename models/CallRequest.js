const mongoose = require("mongoose"); // Import the mongoose connection
const { GENDERS } = require("../utils/AppConstants");

const callRequestSchema = new mongoose.Schema({
  callBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  callByGender: { enum: GENDERS, required: true },
  callToGender: { enum: GENDERS, required: true },
  isResponded: { type: Boolean, required: true },
  isAnswered: { type: Boolean },
  createdAt: { type: Date, default: new Date() },
});

const CallRequest = mongoose.model("CallRequest", callRequestSchema);

module.exports = CallRequest;
