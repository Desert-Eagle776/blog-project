const express = require('express');
const controller = require('../controllers/blogPageController.cjs');

const router = express.Router();

router.get('/', controller.blogPageGet);

module.exports = router;