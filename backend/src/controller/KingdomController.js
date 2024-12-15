
const Kingdom = require("../models/KingdomModel");
const KingdomService = require("../services/KingdomService")
const createKingdom = async (req, res) => {
    try {

        const { kingdom_name } = req.body;
        if (!kingdom_name) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }


        const respone = await KingdomService.createKingdom(kingdom_name)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateKingdom = async (req, res) => {
    try {
        const kingdom_id = req.params.id;

        if (!kingdom_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'class_id not exists'
            })
        }
        const respone = await KingdomService.updateKingdom(kingdom_id, req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteKingdom = async (req, res) => {
    try {
        const kingdom_id = req.params.id;
        if (!kingdom_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'kingdom is not exists'
            })
        }
        const response = await KingdomService.deleteKingdom(kingdom_id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const createNewKingdom = async (req, res) => {
    try {
        const { kingdom_name } = req.body;
        const kingdomData = { kingdom_name };

        console.log(">>> Check input data == ", kingdomData);
        const newKingdom = await postKingdom(kingdomData);

        return res.status(201).json({
            message: 'Kingdom created successfully!',
            data: newKingdom
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


}
const getDetailKingdom = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await KingdomService.getDetailKingdom(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createKingdom,
    updateKingdom,
    deleteKingdom,
    createNewKingdom,
    getDetailKingdom
}