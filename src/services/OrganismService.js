const Class = require("../models/ClassModel");
const ConservationStatus = require("../models/ConservationStatusModel");
const Districts = require("../models/DistrictsModel");
const Family = require("../models/FamilyModel");
const FileUpLoad = require("../models/FileUploadModel");
const Genus = require("../models/GenusModel");
const GroupOfOrganisms = require("../models/GroupOfOrganismsModel");
const Kingdom = require("../models/KingdomModel");
const LocationSample = require("../models/LocationSampleModel");
const Message = require("../models/MessageModel");
const Orders = require("../models/OrdersModel");
const Organism = require("../models/OrganismModel");
const Phylum = require("../models/PhylumModel");
const Provinces = require("../models/ProvincesModel");

const Role = require("../models/RoleModel");
const Sample = require("../models/SampleModel");
const Users = require("../models/UsersModel");
const Wards = require("../models/WardsModel");
const createOrganism = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const { cultivated, hostPlantAnimal, generalNotes, museumNotes, informationSource, speciesNameLevel1, firstAuthor, subspeciesLevel1, speciesNameLevel2, secondAuthor, subspeciesLevel2, speciesNameLevel3, thirdAuthor, nomenclatureStatus, nomenclatureLevel, sientificName, authorName, commonName, publicationReference, yearOfAuthorName, synonymName, treeForm, lifeForm, ecologicalNiche, speciesDescription, habitat, distributionArea, ethnobotany, usageGroup, endangeredRareSpecies, class_id, groupOfOrganisms_id, conservationstatus_id, kingdom_id, order_id, family_id, genus_id, phylum_id } = data
            const {
                class_id,
                groupoforganisms_id,
                conservationstatus_id,
                kingdom_id,
                order_id,
                family_id,
                genus_id,
                phylum_id,
                ...optionalFields // Lấy tất cả các trường không bắt buộc còn lại
            } = data;
            const organismwithclass = await Class.findAll({
                where: { class_id: class_id }
            });
            const organismwithgroup = await GroupOfOrganisms.findAll({
                where: { groupoforganisms_id: groupoforganisms_id }
            });
            const organismwithconser = await ConservationStatus.findAll({
                where: { conservationstatus_id: conservationstatus_id }
            });
            const organismwithkingdom = await Kingdom.findAll({
                where: { kingdom_id: kingdom_id }
            });
            const organismwithorder = await Orders.findAll({
                where: { order_id: order_id }
            });
            const organismwithfamily = await Family.findAll({
                where: { family_id: family_id }
            });
            const organismwithgenus = await Genus.findAll({
                where: { genus_id: genus_id }
            });
            const organismwithphylum = await Phylum.findAll({
                where: { phylum_id: phylum_id }
            });

            if (organismwithclass.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'class_id not exist',

                })
            }
            if (organismwithconser.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'conservationstatus_id not exist',

                })
            }
            if (organismwithfamily.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'family_id not exist',

                })
            }
            if (organismwithgenus.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'genus_id not exist',

                })
            }
            if (organismwithgroup.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'groupoforganisms_id not exist',

                })
            }
            if (organismwithkingdom.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'kingdom_id not exist',

                })
            }
            if (organismwithorder.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'order_id not exist',

                })
            }
            if (organismwithphylum.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'phylum_id not exist',

                })
            }


            // const createdOrganism = await Organism.create(
            //     {
            //         cultivated,
            //         hostPlantAnimal,
            //         generalNotes,
            //         museumNotes,
            //         informationSource,
            //         speciesNameLevel1,
            //         firstAuthor,
            //         subspeciesLevel1,
            //         speciesNameLevel2,
            //         secondAuthor,
            //         subspeciesLevel2,
            //         speciesNameLevel3,
            //         thirdAuthor,
            //         nomenclatureStatus,
            //         nomenclatureLevel,
            //         sientificName,
            //         authorName,
            //         commonName,
            //         publicationReference,
            //         yearOfAuthorName,
            //         synonymName,
            //         treeForm,
            //         lifeForm,
            //         ecologicalNiche,
            //         speciesDescription,
            //         habitat,
            //         distributionArea,
            //         ethnobotany,
            //         usageGroup,
            //         endangeredRareSpecies,
            //         groupOfOrganisms_id,
            //         conservationstatus_id,
            //         kingdom_id,
            //         phylum_id,
            //         class_id,
            //         order_id,
            //         family_id,
            //         genus_id
            //     }
            // )
            const createdOrganism = await Organism.create(
                {

                    groupoforganisms_id,
                    conservationstatus_id,
                    kingdom_id,
                    phylum_id,
                    class_id,
                    order_id,
                    family_id,
                    genus_id,
                    ...optionalFields
                }
            )
            if (createdOrganism) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdOrganism
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateOrganism = (organism_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { class_id, groupoforganisms_id, conservationstatus_id, kingdom_id, phylum_id, order_id, family_id, genus_id } = data;
            const checkOrganism = await Organism.findByPk(organism_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkOrganism === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Organism is not defined'
                })

            }
            if (class_id !== undefined) {
                const organismwithclass = await Class.findAll({
                    where: { class_id: class_id }
                });

                if (organismwithclass.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'class_id not exist',

                    })
                }


            }

            if (groupoforganisms_id !== undefined) {
                const organismwithgroup = await GroupOfOrganisms.findAll({
                    where: { groupoforganisms_id: groupoforganisms_id }
                });

                if (organismwithgroup.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'groupoforganisms_id not exist',

                    })
                }


            }
            if (conservationstatus_id !== undefined) {
                const organismwithconser = await ConservationStatus.findAll({
                    where: { conservationstatus_id: conservationstatus_id }
                });

                if (organismwithconser.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'conservationstatus_id not exist',

                    })
                }


            }
            if (kingdom_id !== undefined) {
                const organismwithkingdom = await Kingdom.findAll({
                    where: { kingdom_id: kingdom_id }
                });

                if (organismwithkingdom.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'kingdom_id not exist',

                    })
                }


            }
            if (phylum_id !== undefined) {
                const organismwithphylum = await Phylum.findAll({
                    where: { phylum_id: phylum_id }
                });

                if (organismwithphylum.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'phylum_id not exist',

                    })
                }


            }
            if (order_id !== undefined) {
                const organismwithorder = await Orders.findAll({
                    where: { order_id: order_id }
                });

                if (organismwithorder.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'class_id not exist',

                    })
                }


            }
            if (family_id !== undefined) {
                const organismwithfamily = await Family.findAll({
                    where: { family_id: family_id }
                });

                if (organismwithfamily.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'family_id not exist',

                    })
                }


            }
            if (genus_id !== undefined) {
                const organismwithgenus = await Genus.findAll({
                    where: { genus_id: genus_id }
                });

                if (organismwithgenus.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'genus_id not exist',

                    })
                }


            }


            await Organism.update(data, { where: { organism_id } }); // Cập nhật dữ liệu
            const updatedOrganism = await Organism.findByPk(organism_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrganism
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteOrganism = (organism_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const organism = await Organism.findByPk(organism_id);
            if (!organism_id) {
                return reject({
                    status: 'ERROR',
                    message: 'Organism is not defined'
                })
            }


            await Identification.destroy({ where: { organism_id: organism_id } });
            Sample.destroy({ where: { organism_id: organism_id } })

            await organism.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Organism Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
module.exports = {
    createOrganism,
    updateOrganism,
    deleteOrganism
}