const express = require('express');
const controller = require('../controllers/profileController.cjs');

const router = express.Router();

router.get('/', controller.profileGet);

module.exports = router;