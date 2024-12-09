const path = require("path");

const fileuploadMiddleware = (req, res, next) => {
    if (!req.files || (!req.files.logo && !req.files.img && !req.files.images)) {
        return next();
    }

    const allowedExtensions = /png|jpg|jpeg/;
    const maxSize = 5 * 1024 * 1024; // 1MB
    const timestamp = Date.now();
    const uploadedFiles = []; // Lưu trữ thông tin các file đã upload

    // Xử lý từng loại file
    const processFile = (image, fileType) => {
        const fileExtension = path.extname(image.name).toLowerCase();
        if (!allowedExtensions.test(fileExtension)) {
            return { error: `File ${image.name} không đúng định dạng (chỉ chấp nhận png, jpg, jpeg).` };
        }

        if (image.size > maxSize) {
            return { error: `File ${image.name} vượt quá giới hạn 5MB.` };
        }

        const fileName = `${path.basename(image.name, fileExtension)}_${timestamp}${fileExtension}`;
        
        let uploadPath;
        if (fileType === 'img') {
            uploadPath = path.join(__dirname, "../../public/uploads/img", fileName);
        } else if (fileType === 'logo') {
            uploadPath = path.join(__dirname, "../../public/uploads/logo", fileName);
        } else if (fileType === 'images') {
            uploadPath = path.join(__dirname, "../../public/uploads/images", fileName);
        }

        // Di chuyển file
        try {
            image.mv(uploadPath);
            const fileUrl = `http://localhost:3001/uploads/${fileType}/${fileName}`;
            uploadedFiles.push({ fileType, fileName, fileUrl });
            return { success: fileUrl };
        } catch (err) {
            return { error: `Không thể upload file ${image.name}: ${err.message}` };
        }
    };

    // Xử lý nhiều file trong mảng `images`
    if (req.files.images) {
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        images.forEach((image) => {
            const result = processFile(image, 'images');
            if (result.error) {
                return res.status(400).json({ error: result.error });
            }
        });
    }

    // Xử lý file `logo`
    if (req.files.logo) {
        const result = processFile(req.files.logo, 'logo');
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        req.body.logo = uploadedFiles.find(file => file.fileType === 'logo')?.fileUrl;
    }

    // Xử lý file `img`
    if (req.files.img) {
        const result = processFile(req.files.img, 'img');
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        req.body.img = uploadedFiles.find(file => file.fileType === 'img')?.fileUrl;
    }

    // Gán danh sách ảnh đã upload vào request
    req.body.images = uploadedFiles.filter(file => file.fileType === 'images').map(file => file.fileUrl);

    next();
};

module.exports = fileuploadMiddleware;
