const jwt = require("jsonwebtoken");
const { BYPASS_TOKEN_ROUTE, STATUS_CODES, SECRET } = require("./AppConstants");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
module.exports.verifyToken = function (req, res, next) {
  if (BYPASS_TOKEN_ROUTE.includes(req.url)) {
    return next();
  }
  const { token } = req.headers;
  if (!token)
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .send({ message: "No token provided." });
  // verifies secret and checks exp
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err || !decoded) {
      return res.status(STATUS_CODES.NOT_AUTHENTICATED).send({
        message: "User session expired, Please log in again!",
      });
    } else {
      req.username = decoded.username;
      req.userId = ObjectId(decoded._id);
      req.gender = decoded.gender;
      return next();
    }
  });
};
