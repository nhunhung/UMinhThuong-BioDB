const { processExcelFile, getDetailsService } = require('../service/upload.service');

const uploadController = async (req, res) => {
    try {
        console.log('Đường dẫn file nhận được:', req.file.path);

        const filePath = req.file.path; 
        // console.log('Path after processing:', filePath);

        const results = await processExcelFile(filePath);

        // console.log('Processed Data:', results);

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

const getDetails = async(req, res) => {
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
module.exports = { uploadController, getDetails };
