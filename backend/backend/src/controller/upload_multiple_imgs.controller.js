const imageUploadController = (req, res) => {
    try {
        const { logo, img, images } = req.body;

        // Kiểm tra nếu không có file nào được upload
        if (!logo && !img && (!images || images.length === 0)) {
            return res.status(400).json({
                message: "Không có file nào được upload.",
            });
        }

        res.status(200).json({
            message: "Upload thành công!",
            data: {
                logo: logo || null,
                img: img || null,
                images: images || [],
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi upload file.",
            error: error.message,
        });
    }
};

module.exports = imageUploadController;
