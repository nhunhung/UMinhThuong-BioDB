const path = require("path");

const fileuploadMiddleware = (req, res, next) => {
    if (!req.files || (!req.files.logo && !req.files.img)) {
        return next();
    }

    let image;
    let fileType;

    if (req.files.logo) {
        image = req.files.logo;
        fileType = 'logo';
    } else if (req.files.img) {
        image = req.files.img;
        fileType = 'img';
    }

    const allowedExtensions = /png|jpg|jpeg/;
    const fileExtension = path.extname(image.name).toLowerCase();
    if (!allowedExtensions.test(fileExtension)) {
        return res.status(400).json({
            error: "Only image files are allowed (png, jpg, jpeg)"
        });
    }

    if (image.size > 1 * 1024 * 1024) {
        return res.status(400).json({
            error: "File size must not exceed 1MB, suitable for logo/uploads."
        });
    }

    const timestamp = Date.now();
    const fileName = `${path.basename(image.name, fileExtension)}_${timestamp}${fileExtension}`;
    let uploadPath;

    if (fileType === 'img') {
        uploadPath = path.join(__dirname, "../../public/uploads/img", fileName);
    } else {
        uploadPath = path.join(__dirname, "../../public/uploads/logo", fileName);
    }

    image.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to upload the image",
                details: err.message
            });
        }

        if (fileType === 'img') {
            req.body[fileType] = `http://localhost:3001/uploads/img/${fileName}`;
        } else {
            req.body[fileType] = `http://localhost:3001/uploads/logo/${fileName}`;
        }

        next();
    });
};

module.exports = fileuploadMiddleware;
