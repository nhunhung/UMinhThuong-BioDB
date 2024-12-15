const express = require("express");
const router = express.Router();

const fileuploadMiddleware = require("../middleware/uploaData/image_upload");
const imageUploadController = require("../controller/upload_multiple_imgs.controller");

router.post("/add", fileuploadMiddleware, imageUploadController);


module.exports = router

