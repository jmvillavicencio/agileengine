const userModel = require('../models/user');

function getBalance(req, res) {
  res.json({
    success: true,
    balance: userModel.currentBalance,
  });
}

function getByUserId(req, res) {
  res.json({
    success: true,
    user: userModel,
  });
}
module.exports = {
  getBalance,
  getByUserId,
};
