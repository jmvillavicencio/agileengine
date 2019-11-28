const express = require('express');
const transactionCtrl = require('../../controllers/transaction');

const router = express.Router();

router.post('/', transactionCtrl.postTransaction);

module.exports = router;