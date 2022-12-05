const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/addedCommentController.cjs');

const router = express.Router();
const urlencodeParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodeParser, controller.addedCommentGet);

module.exports = router;