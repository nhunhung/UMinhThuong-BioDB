const { postGroupOfOrganism, deleteGroupOfOrganism } = require("../service/group_of_organisms.service")

const createNewGroupOfOrganism = async (req, res) => {
    try {
        const { goo_name } = req.body;
        const logo = req.body.logo || "N/A";


        const groupOfOrganismData = { goo_name, logo};

        console.log(">>> Check name == ", req.body.logo);
        const newGroupOfOrganism= await postGroupOfOrganism(groupOfOrganismData);

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
const removeGroupOfOrganism = async (req, res) => {
    const { groupoforganisms_id } = req.params;
    console.log('Check groupoforganisms_id == ', groupoforganisms_id);

    try {
        const result = await deleteGroupOfOrganism(groupoforganisms_id);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message || "Failed to delete group of organism",
        });
    }
};

module.exports = { createNewGroupOfOrganism, removeGroupOfOrganism }