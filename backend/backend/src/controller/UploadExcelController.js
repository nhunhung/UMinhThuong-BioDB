const { processExcelFile, getDetailsService, checkData } = require('../services/UploadExcelService');

const uploadController = async (req, res) => {
    try {
       
        const filePath = req.file.path;
        const results = await processExcelFile(filePath);
        res.status(200).json({
            message: 'Upload and store data succesfully!',
            results,
        });
    } catch (error) {
        console.error('Error when uploading:', error.message);

        res.status(500).json({
            message: 'Error when uploading:',
            error: error.message,
        });
    }
};

const getDetails = async (req, res) => {
    try {

        const details = await getDetailsService();
        return res.status(200).json({
            message: "Retrival successfully",
            details: details
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            Error: error.message
        })
    }
}



const checkExcelData = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Không có file được tải lên' });
    }
    try {
        const fileBuffer = req.file.buffer;
        const logs = checkData(fileBuffer);
        return res.status(200).json({ success: true, logs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra khi kiểm tra file Excel.' });
    }
};

module.exports = { uploadController, getDetails, checkExcelData };
