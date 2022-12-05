const express = require('express');
const controller = require('../controllers/changedCommentController.cjs');

const router = express.Router();
const jsonParser = express.json();

router.post('/', jsonParser, controller.changedCommentPost);

module.exports = router;