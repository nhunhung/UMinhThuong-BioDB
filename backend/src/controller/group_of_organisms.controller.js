const { postGroupOfOrganism } = require("../service/group_of_organisms.service")

const createNewGroupOfOrganism = async (req, res) => {
    try {
        const { logo, name} = req.body;
        const groupOfOrganismData = {logo, name };

        console.log(">>> Check name == ", groupOfOrganismData);
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
module.exports = { createNewGroupOfOrganism }