const userModel = require("../models/user");
const accountModel = require("../models/account");
exports.register = async (req, res) => {
  const { username, firstName, lastName, password, email } = req.body;

  let user = await userModel.findOne({ email });
  const initialBal = Math.floor(Math.random() * 100000);
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

  const accountData = await accountModel.create({
    userId: user._id,
    balance: initialBal,
  });
  const token = user.getSignedjwtToken();
  res
    .status(200)
    .json({
      success: true,
      message: "User created successfully",
      token,
      balance: accountData.balance,
    });
};

exports.signin = async (req, res) => {
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

exports.updateUser = async (req, res) => {
  const { firstName, lastName, password } = req.body;
  const user = req.user;
  const updatedUser = await userModel.findByIdAndUpdate(
    user._id,
    {
      firstName,
      lastName,
      password,
    },
    { new: true, runValidators: true }
  );
  res.json({
    success: true,
    message: "Updated successfully",
    data: updatedUser,
  });
};

exports.getUsers = async (req, res) => {
  const filter = req.query.filter || "";

  const users = await userModel.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.json({ success: true, data: users });
};
