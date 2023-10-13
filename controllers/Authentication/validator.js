const { default: mongoose } = require("mongoose");
const { GENDERS } = require("../../utils/AppConstants");

const routeModels = {
  "/register": mongoose.model(
    "register",
    new mongoose.Schema({
      username: { type: String, required: true },
      password: { type: String, required: true },
      confirmPassword: { type: String, required: true },
      gender: { type: String, required: true, enum: GENDERS },
    })
  ),
};

module.exports = function handler(req, res, next) {
  if (!routeModels[req.path]) {
    return res.status(403).json({ message: "No validator found for this API" });
  }

  if (routeModels[req.path]) {
    let doc;
    if (Array.isArray(req.body) && req.path === "/submit-order-details") {
      doc = new routeModels[req.path]({ orders: req.body });
    } else {
      doc = new routeModels[req.path]({
        ...req.body,
        ...req.query,
      });
    }
    const error = doc.validateSync();

    if (error) {
      return res.status(403).send({ error: error.message });
    }

    const queryMethods = ["GET"];
    const bodyMethods = ["POST"];
    if (queryMethods.includes(req.method)) req.query = doc.toObject();
    if (bodyMethods.includes(req.method)) req.body = doc.toObject();
  }
  next();
};
