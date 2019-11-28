const express = require('express');
const transactionRoutes = require('./transaction');
const accountCtrl = require('../../controllers/account');

const router = express.Router();

router.get('/authenticate', accountCtrl.authenticate);
router.get('/balance', accountCtrl.getBalance);
router.use('/transaction', transactionRoutes);
router.get('/by/userId/:userId', accountCtrl.getByUserId);

module.exports = router;
