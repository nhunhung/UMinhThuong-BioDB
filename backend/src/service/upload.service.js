const XLSX = require("xlsx");
const db = require("../config/database");
const { QueryError, QueryTypes } = require("sequelize");
// const {  } = require("../utils/convert_to_boolean");

const { postClass } = require("./classes.service")
const { postConservationStatus } = require("./conservation_status.service")
const { postDistrict } = require("./districts.service")
const { postFamily } = require("./families.service")
const { postGenus } = require("./genus.service")
const { postGroupOfOrganism } = require("./group_of_organisms.service")
const { postIdentification } = require("./identification.service")
const { postKingdom } = require("./kingdom.service")
const { postLocationSample } = require("./location_samples.service")
const { postOrder } = require("./orders.service")
const { postOrganism } = require("./organisms.service")
const { postPhylum } = require("./phylums.service")
const { postProvince } = require("./provinces.service")
const { postSample } = require("./sample.service")
const { postWard } = require("./wards.service")


const processExcelFile = async (filePath) => {
    // Read file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // take first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert into array
    const data = XLSX.utils.sheet_to_json(sheet);
    const records = [];



    for (const row of data) {
        try {
            const province = await postProvince(row.province_name);

            const distictRowDt = {
                district_name: row.district_name,
                provinces_id: province.provinces_id
            }
            const district = await postDistrict(distictRowDt)

            const wardRowDt = {
                ward_name: row.ward_name,
                districts_id: district.districts_id
            }
            const ward = await postWard(wardRowDt)

            const locationSampleRowDt = {
                country: row.country,
                provinces_id: province.provinces_id,
                districts_id: district.districts_id,
                wards_id: ward.wards_id,
                collectionVillage: row.collectionVillage,
                location: row.location,
                locationNotes: row.locationNotes,
                latitude: row.latitude,
                northSouth: row.northSouth,
                longitude: row.longitude,
                eastWest: row.eastWest,
                elevation: row.elevation,
                maxElevationRange: row.maxElevationRange,
                elevationUnit: row.elevationUnit,
                vn2000Longitude: row.vn2000Longitude,
                vn2000Latitude: row.vn2000Latitude
            }
            const location_sample = await postLocationSample(locationSampleRowDt)

            const conservationStatusRowDt = {
                iucnRedList: row.iucnRedList,
                iucnRedListVersion: row.iucnRedListVersion,
                citesSpecies: row.citesSpecies,
                vietnamRedList: row.vietnamRedList,
                decree81: row.decree81,
                decree64: row.decree64,
                endemic: row.endemic,
                circular35: row.circular35,


            }
            console.log("conservationStatusRowDt:", conservationStatusRowDt);

            const conservation_status = await postConservationStatus(conservationStatusRowDt);

            const gooRowDt = {
                // logo: row.logo,
                goo_name: row.goo_name
            }
            const group_of_organism = await postGroupOfOrganism(gooRowDt);

            const kingdomRowDt = {
                kingdom_name: row.kingdom_name,
            }
            const kingdom = await postKingdom(kingdomRowDt);

            const phylumRowDt = {
                phylum_name: row.phylum_name,
                kingdom_id: kingdom.kingdom_id
            }
            const phylum = await postPhylum(phylumRowDt);

            const classRowDt = {
                class_name: row.class_name,
                phylum_id: kingdom.phylum_id
            }
            const class_or = await postClass(classRowDt);

            const orderRowDt = {
                order_name: row.order_name,
                class_id: class_or.class_id
            }
            const order = await postOrder(orderRowDt);

            const familyRowDt = {
                family_name: row.family_name,
                order_id: order.order_id
            }
            const family = await postFamily(familyRowDt);

            const genusRowDt = {
                genus_name: row.genus_name,
                family_id: family.family_id
            }
            const genus = await postGenus(genusRowDt);

            const organismRowDt = {
                cultivated: row.cultivated,
                hostPlantAnimal: row.hostPlantAnimal,
                generalNotes: row.generalNotes,
                informationSource: row.informationSource,
                museumNotes: row.museumNotes,
                speciesNameLevel1: row.speciesNameLevel1,
                firstAuthor: row.firstAuthor,
                speciesNameLevel2: row.speciesNameLevel2,
                subspeciesLevel1: row.subspeciesLevel1,
                secondAuthor: row.secondAuthor,
                subspeciesLevel2: row.subspeciesLevel2,
                speciesNameLevel3: row.speciesNameLevel3,
                thirdAuthor: row.thirdAuthor,
                nomenclatureStatus: row.nomenclatureStatus,
                nomenclatureLevel: row.nomenclatureLevel,
                scientificName: row.scientificName,
                authorName: row.authorName,
                commonName: row.commonName,
                publicationReference: row.publicationReference,
                yearOfAuthorName: row.yearOfAuthorName,
                synonymName: row.synonymName,
                treeForm: row.treeForm,
                lifeForm: row.lifeForm,
                ecologicalNiche: row.ecologicalNiche,
                speciesDescription: row.speciesDescription,
                habitat: row.habitat,
                distributionArea: row.distributionArea,
                ethnobotany: row.ethnobotany,
                usageGroup: row.usageGroup,
                endangeredRareSpecies: row.endangeredRareSpecies,
                conservationstatus_id: conservation_status.conservationstatus_id,
                groupoforganisms_id: group_of_organism.groupoforganisms_id,
                kingdom_id: kingdom.kingdom_id,
                class_id: class_or.class_id,
                phylum_id: phylum.phylum_id,
                order_id: order.order_id,
                family_id: family.family_id,
                genus_id: genus.genus_id,
                images: row.images
            }
            console.log("Organism: ", organismRowDt);
            const organism = await postOrganism(organismRowDt);

            const sampleRowDt = {
                locationsample_id: location_sample.locationsample_id,
                organism_id: organism.organism_id,
                recordNumber1: row.recordNumber1,
                project: row.project,
                recordType: row.recordType,
                museumCode: row.museumCode,
                specimenCode: row.specimenCode,
                typeSpecimen: row.typeSpecimen,
                recordNumber2: row.recordNumber2,
                specimenQuanity: row.specimenQuanity,
                primaryCollector: row.primaryCollector,
                collaborator: row.collaborator,
                recordDate: row.recordDate,
                recordMonth: row.recordMonth,
                recordYear: row.recordYear
            }
            const sample = await postSample(sampleRowDt);

            const identificationRowDt = {
                identificationStatus: (row.identificationStatus),
                reference: row.reference,
                identifier: row.identifier,
                secondIdentifier: row.secondIdentifier,
                identificationDate: row.identificationDate,
                identificationMonth: row.identificationMonth,
                identificationYear: row.identificationYear,
                organism_id: row.organism_id,
                sample_id: row.sample_id,

            }
            const identification = await postIdentification(identificationRowDt);

            records.push({ province, district, ward, location_sample, group_of_organism, kingdom, phylum, class_or, order, family, genus, conservation_status, identification, organism, sample });
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error.message);
            throw new Error("Lỗi khi lưu dữ liệu vào database");
        }
    }

    return records;
};

const getDetailsService = async () => {
    try {
        const details = await db.sequelize.query(
            `
                SELECT f.family_name, o.order_name
                FROM "Families" AS f
                INNER JOIN "Orders" AS o 
                ON f.order_id = o.order_id;
            `,
            {
                type: QueryTypes.SELECT,
            }
        );

        return details;
    } catch (error) {
        console.error("Error = ", error.message);
        throw new Error("Error");
    }
};
module.exports = { processExcelFile, getDetailsService };
