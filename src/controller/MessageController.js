const Message = require("../models/MessageModel");
const MessageService = require("../services/MessageService")
const createMessage = async (req, res) => {
    try {
        const { content, sent_date, status, users_id } = req.body;
        if (!content || !status || !sent_date || !users_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await MessageService.createMessage(req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateMassage = async (req, res) => {
    try {
        const message_id = req.params.id;

        if (!message_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Message_id not exists'
            })
        }
        const respone = await MessageService.updateMassage(message_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteMessage = async (req, res) => {
    try {
        const message_id = req.params.id;
        if (!message_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Message_id is not exists'
            })
        }
        const response = await MessageService.deleteMessage(message_id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
module.exports = {
    createMessage,
    updateMassage,
    deleteMessage
}