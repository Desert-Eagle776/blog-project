const express = require('express');
const controller = require('../controllers/homeController.cjs');

const router = express.Router();

router.get('/', controller.homeGet);

module.exports = router;