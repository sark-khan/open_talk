const User = require("../../models/User");

module.exports.login = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: "Please fill all the details" });
  }
  const userDetails = await User.findOne({ username: username });
  if (!userDetails) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: "No such user exists" });
  }
  if (userDetails.password != password) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Incorrect Password" });
  }
  const tokenData = {
    name: userDetails.name,
    gender: userDetails.gender,
    userId: userDetails._id,
  };
  const token = jwt.sign(tokenData, SECRET);
  return res
    .status(STATUS_CODES.OK)
    .json({ message: "Login Successfull", token: tokenData });
};

module.exports.register = async (req) => {
  const { username, password, confirmPassword, gender } = req.body;
  if (password != confirmPassword) {
    throw new Error("password did not match");
  }
  const userDetails = await User.findOne({ username: username });
  if (userDetails) {
    throw new Error("username already exists");
  }
  const user = await User.create({
    username,
    password,
    gender,
  });
  return { user };
};
