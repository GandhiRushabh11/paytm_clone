const userModel = require("../models/user");
exports.register = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  const user = await userModel.create({
    username,
    firstName,
    lastName,
    password,
  });
  res.status(200).json({ success: true, user });
};
