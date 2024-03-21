const { default: mongoose } = require("mongoose");
const accountModel = require("../models/account");

exports.getBalance = async (req, res) => {
  const account = await accountModel.findOne({ userId: req.user._id });

  res.status(200).json({
    success: true,
    message: "Balance fetched successfully",
    balance: account.balance,
  });
};
exports.transfer = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await accountModel.findOne({ userId: req.user._id });

  if (!account && account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await accountModel.findOne({
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  // Perform the transfer
  await accountModel.updateOne(
    { userId: req.user._id },
    { $inc: { balance: -amount } }
  );

  await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } });

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    success: true,
    message: "Transfer successful",
  });
};
