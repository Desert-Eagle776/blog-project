const express = require('express');
const controller = require('../controllers/removeCommentController.cjs');

const router = express.Router();
const jsonParser = express.json();

router.post('/', jsonParser, controller.removeCommentPost);

module.exports = router;