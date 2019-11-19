const express = require('express');
const authRoutes = require('./auth');
const accountRoutes = require('./account');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('PONG');
});

router.use('/auth', authRoutes);
router.use('/account', accountRoutes);

module.exports = router;
