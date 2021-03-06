const userModel = require('../models/user');

function postTransaction(req, res) {
  const { amount: rawAmount, userId, destinationAccount, type } = req.body;
  const user = userModel.get();
  if (user.id !== userId) {
    res.status(500).json({
      error: 'BAD_AUTHENTICATION',
    });
    return;
  }
  if (!destinationAccount || destinationAccount === user.account || !rawAmount) {
    res.status(500).json({
      error: 'BAD_TRANSACTION',
    });
    return;
  }
  try {
    const amount = parseFloat(rawAmount);
    user.addTransaction({
      amount,
      destinationAccount,
    }, type);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    return;
  }
  res.json({
    success: true,
    balance: user.currentBalance,
  });
}

module.exports = {
  postTransaction,
};