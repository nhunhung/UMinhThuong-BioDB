const multer = require('multer');

// Cấu hình lưu trữ file trong bộ nhớ RAM
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).single('file'); 

module.exports = uploadMiddleware;
