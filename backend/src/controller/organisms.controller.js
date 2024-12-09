const { postOrganism } = require("../service/organisms.service")

const createNewOrganism = async (req, res) => {
    try {
        const {
            cultivated,
            hostPlantAnimal,
            generalNotes,
            museumNotes,
            informationSource,
            speciesNameLevel1,
            firstAuthor,
            speciesNameLevel2,
            subspeciesLevel1,
            secondAuthor,
            subspeciesLevel2,
            speciesNameLevel3,
            thirdAuthor,
            nomenclatureStatus,
            nomenclatureLevel,
            scientificName,
            authorName,
            commonName,
            publicationReference,
            yearOfAuthorName,
            synonymName,
            treeForm,
            lifeForm,
            ecologicalNiche,
            speciesDescription,
            habitat,
            distributionArea,
            ethnobotany,
            usageGroup,
            endangeredRareSpecies,
            conservationstatus_id,
            groupoforganisms_id,
            kingdom_id,
            phylum_id,
            class_id,
            order_id,
            family_id,
            genus_id } = req.body;
        const images = req.body.images || "N/A";


        const organismsData = {
            cultivated,
            hostPlantAnimal,
            generalNotes,
            museumNotes,
            informationSource,
            speciesNameLevel1,
            firstAuthor,
            speciesNameLevel2,
            subspeciesLevel1,
            secondAuthor,
            subspeciesLevel2,
            speciesNameLevel3,
            thirdAuthor,
            nomenclatureStatus,
            nomenclatureLevel,
            scientificName,
            authorName,
            commonName,
            publicationReference,
            yearOfAuthorName,
            synonymName,
            treeForm,
            lifeForm,
            ecologicalNiche,
            speciesDescription,
            habitat,
            distributionArea,
            ethnobotany,
            usageGroup,
            endangeredRareSpecies,
            images,
            conservationstatus_id,
            groupoforganisms_id,
            kingdom_id,
            phylum_id,
            class_id,
            order_id,
            family_id,
            genus_id
        };

        console.log(">>> Check name == ", organismsData);
        const newOrganism = await postOrganism(organismsData);

        return res.status(201).json({
            message: 'Organism created successfully!',
            data: newOrganism
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
module.exports = { createNewOrganism }