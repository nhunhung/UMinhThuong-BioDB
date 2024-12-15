const multer = require('multer');
const path = require('path');

// Cấu hình
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../storage/uploads/files'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Kích thước file tối đa 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-excel', // .xls
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            // Kiểm tra đuôi file 
            const extname = path.extname(file.originalname).toLowerCase();
            if (extname !== '.xlsx' && extname !== '.xls') {
                return cb(new Error('Chỉ chấp nhận file Excel với định dạng .xlsx hoặc .xls!'));
            }

            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file Excel!'));
        }
    },
});

module.exports = upload.single('file');
