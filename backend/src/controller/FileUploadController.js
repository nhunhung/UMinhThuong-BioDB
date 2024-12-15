const FileUpLoad = require("../models/FileUploadModel");
const FileUpLoadService = require("../services/FileUploadService")
const createFileUpLoad = async (req, res) => {
    try {
        const { filename, upload_date, status, users_id } = req.body;
        if (!filename || !status || !upload_date || !users_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await FileUpLoadService.createFileUpLoad(req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateFileUpLoad = async (req, res) => {
    try {
        const fileupload_id = req.params.id;

        if (!fileupload_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'fileupload_id not exists'
            })
        }
        const respone = await FileUpLoadService.updateFileUpLoad(fileupload_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteFileUpLoad = async (req, res) => {
    try {
        const fileupload_id = req.params.id;
        if (!fileupload_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'FileUpload_id is not exists'
            })
        }
        const response = await FileUpLoadService.deleteFileUpLoad(fileupload_id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const getDetailFileUpLoad = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await FileUpLoadService.getDetailFileUpLoad(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createFileUpLoad,
    updateFileUpLoad,
    deleteFileUpLoad,
    getDetailFileUpLoad
}