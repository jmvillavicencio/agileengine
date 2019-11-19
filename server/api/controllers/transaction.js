const userModel = require('../models/user');

function postTransaction(req, res) {
  const { amount: rawAmount, userId, destinationAccount } = req.body;
  if (userModel.id !== userId) {
    res.status(500).json({
      error: 'BAD_AUTHENTICATION',
    });
    return;
  }
  if (!destinationAccount || destinationAccount === userModel.account || !rawAmount) {
    res.status(500).json({
      error: 'BAD_TRANSACTION',
    });
    return;
  }
  try {
    const amount = parseFloat(rawAmount);
    userModel.addTransaction({
      amount,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    return;
  }
  res.json({
    success: true,
    balance: userModel.currentBalance,
  });
}

module.exports = {
  postTransaction,
};
