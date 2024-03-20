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
  const { to, amount } = req.body;
  const account = await accountModel.findOne({ userId: req.user._id });

  if (!account && account.balance < amount) {
    await session.abortTransaction();
    console.log("Insufficient balance");
    return;
  }

  const toAccount = await accountModel.findOne({ userId: to });

  if (!toAccount) {
    await session.abortTransaction();
    console.log("Invalid account");
    return;
  }
  // Perform the transfer
  await accountModel.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );

  await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } });

  // Commit the transaction
  await session.commitTransaction();
  console.log("done");
  res.status(200).json({
    success: true,
    message: "Transfer successful",
  });
};
