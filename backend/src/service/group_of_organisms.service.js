const db = require("../config/database");
const path = require("path");
const fs = require("fs");
const { GroupOfOrganisms } = db;

const postGroupOfOrganism = async (groupOfOrganismsData) => {
    try {
        const groupOfOrganism = await GroupOfOrganisms.create({
            logo: groupOfOrganismsData.logo,
            goo_name: groupOfOrganismsData.goo_name
        });
        return groupOfOrganism;
    } catch (error) {
        console.error("Error creating a new group of organism: ", error.message);
        throw error;
    }
}

const deleteGroupOfOrganism = async (groupoforganisms_id) => {
    try {
        const group = await GroupOfOrganisms.findByPk(groupoforganisms_id);
        if (!group) {
            throw new Error("Group of Organism not found");
        }

        // Delete the file if it exists
        if (group.logo) {
            const filePath = path.join(__dirname, "../public/", group.logo);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Remove the image file from disk
            }
        }

        await group.destroy();
        return { message: "Group of Organism deleted successfully" };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    postGroupOfOrganism, deleteGroupOfOrganism
}