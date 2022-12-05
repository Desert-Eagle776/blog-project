const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/autoController.cjs');

const router = express.Router();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

router.get('/', controller.autoGet);
router.post('/', urlencodeParser, controller.autoPost);

module.exports = router;