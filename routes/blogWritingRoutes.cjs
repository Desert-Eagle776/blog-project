const express = require('express');
const multer = require('multer');
const controller = require('../controllers/blogWritingController.cjs');

const router = express.Router();
const upload = multer({ dest: "uploads" });

router.get('/', controller.blogWritingGet);
router.post('/', upload.single('file'), controller.blogWritingPost);

module.exports = router;