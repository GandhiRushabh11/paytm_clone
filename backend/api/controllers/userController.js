const userModel = require("../models/user");

exports.register = async (req, res) => {
  const { username, firstName, lastName, password, email } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    return res.json({
      success: false,
      message: "Email is invalid or already taken",
    });
  }
  user = await userModel.create({
    username,
    firstName,
    lastName,
    password,
    email,
  });

  const token = user.getSignedjwtToken();
  res
    .status(200)
    .json({ success: true, message: "User created successfully", token });
};

exports.sigin = async (req, res) => {
  const { username, password } = req.body;

  let user = await userModel.findOne({ username });

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = user.getSignedjwtToken();
  res.status(200).json({ success: true, token });
};
