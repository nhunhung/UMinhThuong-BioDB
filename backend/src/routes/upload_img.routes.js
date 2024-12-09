const express = require("express");
const router = express.Router();
const fileuploadMiddleware = require("../middleware/uploadData/image_upload");
const imageUploadController = require("../controller/upload_multiple_imgs.controller");

// Định nghĩa route
router.post("/add", fileuploadMiddleware, imageUploadController);

module.exports = router;
