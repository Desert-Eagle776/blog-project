const express = require('express');
const multer = require('multer');
const controller = require('../controllers/changeProfileController.cjs');

const router = express.Router();
const upload = multer({ dest: "uploads" });

router.post('/', upload.single('avatar'), controller.profileGet);

module.exports = router;