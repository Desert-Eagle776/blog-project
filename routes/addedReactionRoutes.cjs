const express = require('express');
const controller = require('../controllers/addedReactionController.cjs');

const router = express.Router();
const jsonParser = express.json();

router.post('/', jsonParser, controller.addedReactionPost);

module.exports = router;