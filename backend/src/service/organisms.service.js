const db = require("../config/database");
const { Organism } = db;

const postOrganism = async (organismsData) => {
    try {
        const organism = await Organism.create({
            cultivated: organismsData.cultivated,
            hostPlantAnimal: organismsData.hostPlantAnimal,
            generalNotes: organismsData.generalNotes,
            museumNotes: organismsData.museumNotes,
            informationSource: organismsData.informationSource,
            speciesNameLevel1: organismsData.speciesNameLevel1,
            firstAuthor: organismsData.firstAuthor,
            speciesNameLevel2: organismsData.speciesNameLevel2,
            subspeciesLevel1: organismsData.subspeciesLevel1,
            secondAuthor: organismsData.secondAuthor,
            subspeciesLevel2: organismsData.subspeciesLevel2,
            speciesNameLevel3: organismsData.speciesNameLevel3,
            thirdAuthor: organismsData.thirdAuthor,
            nomenclatureStatus: organismsData.nomenclatureStatus,
            nomenclatureLevel: organismsData.nomenclatureLevel,
            scientificName: organismsData.scientificName,
            authorName: organismsData.authorName,
            commonName: organismsData.commonName,
            publicationReference: organismsData.publicationReference,
            yearOfAuthorName: organismsData.yearOfAuthorName,
            synonymName: organismsData.synonymName,
            treeForm: organismsData.treeForm,
            lifeForm: organismsData.lifeForm,
            ecologicalNiche: organismsData.ecologicalNiche,
            speciesDescription: organismsData.speciesDescription,
            habitat: organismsData.habitat,
            distributionArea: organismsData.distributionArea,
            ethnobotany: organismsData.ethnobotany,
            usageGroup: organismsData.usageGroup,
            endangeredRareSpecies: organismsData.endangeredRareSpecies,
            img: organismsData.img,
            conservationstatus_id: organismsData.conservationstatus_id,
            groupoforganisms_id: organismsData.groupoforganisms_id,
            kingdom_id: organismsData.kingdom_id,
            phylum_id: organismsData.phylum_id,
            class_id: organismsData.class_id,
            order_id: organismsData.order_id,
            family_id: organismsData.family_id,
            genus_id: organismsData.genus_id
        });
        return organism;
    } catch (error) {
        console.error("Error creating a new organism: ", error.message);
        throw error;
    }
}

module.exports = {
    postOrganism
}