const express = require("express");
const { STATUS_CODES } = require("../../utils/AppConstants");
const { login, register, callCreateInitiate } = require("./services");
const router = express.Router();

router.post("/call-initiate-or-create", async (req, res) => {
  try {
    const response = await callCreateInitiate(req);
    return res.status(STATUS_CODES.OK).json(response);
  } catch (error) {
    console.error(req.path, "Error in call Iniiate or Create Api", error);
    return res
      .status(error.status || STATUS_CODES.BAD_REQUEST)
      .json({ message: error.message });
  }
});
module.exports = router;
