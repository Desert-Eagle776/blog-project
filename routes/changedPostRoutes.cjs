const express = require('express');
const multer = require('multer');
const controller = require('../controllers/changedPostController.cjs');

const router = express.Router();
const upload = multer({ dest: "uploads" });

router.get('/', controller.changedPostGet);
router.post('/', upload.single('file'), controller.changedPostPost);

module.exports = router;