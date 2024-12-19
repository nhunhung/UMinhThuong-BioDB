const Role = require("../models/RoleModel");
const GroupOfOrganismsService = require("../services/GroupOfOrganismsService")
const createGroupOfOrganisms = async (req, res) => {
    try {
        const { logo, goo_name } = req.body
        if (!goo_name || !logo) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await GroupOfOrganismsService.createGroupOfOrganisms(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const updateGroupOfOrganisms = async (req, res) => {
    try {

        const groupoforganisms_id = req.params.id;
        if (!groupoforganisms_id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const respone = await GroupOfOrganismsService.updateGroupOfOrganisms(groupoforganisms_id, req.body);
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteGroupOfOrganisms = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }
        const response = await GroupOfOrganismsService.deleteGroupOfOrganisms(id)
        return res.status(200).json(response);

    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const createNewGroupOfOrganism = async (req, res) => {
    try {
        const { goo_name } = req.body;
        const logo = req.body.logo || "N/A";


        const groupOfOrganismData = { goo_name, logo };

        console.log(">>> Check name == ", req.body.logo);
        const newGroupOfOrganism = await GroupOfOrganismsService.postGroupOfOrganism(groupOfOrganismData);

        return res.status(201).json({
            message: 'Group of organism status created successfully!',
            data: newGroupOfOrganism
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
const getDetailGroupOfOrganisms = async (req, res) => {
    try {
        const id = req.params.id;


        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The  id is required'
            })
        }

        const respone = await GroupOfOrganismsService.getDetailGroupOfOrganisms(id)

        return res.status(200).json(respone)


    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }

}
module.exports = {
    createGroupOfOrganisms,
    updateGroupOfOrganisms,
    deleteGroupOfOrganisms,
    createNewGroupOfOrganism,
    getDetailGroupOfOrganisms
}