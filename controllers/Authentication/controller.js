const express = require("express");
const { STATUS_CODES } = require("../../utils/AppConstants");
const { login, register } = require("./services");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const response = await login(req);
    return res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    console.error(req.path, "Error in login Api", error);
    return res
      .status(error.status || STATUS_CODES.BAD_REQUEST)
      .json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const response = await register(req);
    return res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    console.error(req.path, "Error in Register Api", error);
    return res
      .status(error.status || STATUS_CODES.BAD_REQUEST)
      .json({ message: error.message });
  }
});
module.exports = router;
