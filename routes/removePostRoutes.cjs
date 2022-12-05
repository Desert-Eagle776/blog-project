const express = require('express');
const controller = require('../controllers/removePostController.cjs');

const router = express.Router();

router.get('/', controller.removePostGet);

module.exports = router;