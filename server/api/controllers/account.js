const userModel = require('../models/user');

function getParsedUser() {
  const { email, name, transactions, id, currentBalance, account } = userModel.get();
  return { email, name, transactions, id, currentBalance, account };
}

function getBalance(req, res) {
  const { currentBalance : balance } = userModel.get();

  res.json({
    success: true,
    balance,
  });
}

function getByUserId(req, res) {
  res.json({
    success: true,
    user: getParsedUser(),
  });
}

function authenticate(req, res) {
  const { email, password } = req.body;
  try {
    userModel.create({ email, password });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
    return;
  }
  res.json({
    success: true,
    user: getParsedUser(),
  });
}

module.exports = {
  authenticate,
  getBalance,
  getByUserId,
};
