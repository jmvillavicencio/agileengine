const userModel = require('../models/user');

function postAuth(req, res) {
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
    user: userModel,
  });
}

module.exports = {
  postAuth,
};
