const express = require('express');
const transactionRoutes = require('./transaction');
const accountCtrl = require('../../controllers/account');

const router = express.Router();

router.use('/transaction', transactionRoutes);
router.get('/balance', accountCtrl.getBalance);
router.get('/by/userId/:userId', accountCtrl.getByUserId);

module.exports = router;
