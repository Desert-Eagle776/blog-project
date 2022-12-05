const express = require('express');
const controller = require('../controllers/myPostsController.cjs');

const router = express.Router();

router.get('/', controller.myPostsGet);

module.exports = router;