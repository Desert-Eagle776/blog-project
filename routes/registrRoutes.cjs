const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/registrController.cjs');

const router = express.Router();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

router.get('/', controller.registrGet);
router.post('/', urlencodeParser, controller.registrPost);

module.exports = router;