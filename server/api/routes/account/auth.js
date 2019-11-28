const express = require('express');
const auhtCtrl = require('../controllers/auth');

const router = express.Router();

router.post('/', auhtCtrl.postAuth);

module.exports = router;
