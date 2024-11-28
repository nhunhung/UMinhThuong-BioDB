const db = require("../config/database");
const { GroupOfOrganisms } = db;

const postGroupOfOrganism = async (groupOfOrganismsData) => {
    try {
        const groupOfOrganism = await GroupOfOrganisms.create({
            logo: groupOfOrganismsData.logo,
            name: groupOfOrganismsData.name
        });
        return groupOfOrganism;
    } catch (error) {
        console.error("Error creating a new group of organism: ", error.message);
        throw error;
    }
}

module.exports = {
    postGroupOfOrganism
}