const Districts = require("../models/DistrictsModel");
const Family = require("../models/FamilyModel");

const Genus = require("../models/GenusModel");

const Organism = require("../models/OrganismModel");

const createGenus = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { genus_name, family_id } = data;
            const genusWithfamily = await Family.findAll({
                where: { family_id: family_id }
            });

            if (genusWithfamily.length === 0) {
                return reject({
                    status: 'ERROR',
                    message: 'family_id not exist',

                })
            }

            const createdGenus = await Genus.create(
                {
                    genus_name,
                    family_id
                }
            )
            if (createdGenus) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdGenus
                })
            }
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const updateGenus = (genus_id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { family_id } = data;
            const checkGenus = await Genus.findByPk(genus_id);  // Tìm theo khóa chính
            console.log('check')
            if (checkGenus === null) {
                return reject({
                    status: 'ERROR',
                    message: 'Genus is not defined'
                })

            }
            if (family_id !== undefined) {
                const genuswithfamily = await Family.findAll({
                    where: { family_id: family_id }
                });

                if (genuswithfamily.length === 0) {
                    return reject({
                        status: 'ERROR',
                        message: 'family_id not exist',

                    })
                }

            }

            await Genus.update(data, { where: { genus_id } }); // Cập nhật dữ liệu
            const updatedGenus = await Genus.findByPk(genus_id); // Lấy lại dữ liệu đã cập nhật
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedGenus,
            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }
    })
}
const deleteGenus = (genus_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const genus = await Genus.findByPk(genus_id);
            if (!genus) {
                return reject({
                    status: 'ERROR',
                    message: 'Genus is not defined'
                })
            }
            const organismsearch = await Organism.findAll({ where: { genus_id: genus_id } });
            const organismIds = organismsearch.map(genus => genus.genus_id)
            if (organismsearch.length > 0) {
                await Identification.destroy({ where: { organism_id: organismIds } });
            }
            // await FileUpLoad.destroy({ where: { users_id: users_id } });
            await Organism.destroy({ where: { genus_id: genus_id } });

            await genus.destroy();
            return resolve({
                status: 'OK',
                message: 'Delete Genus Succesfull',

            })
        } catch (e) {
            reject(e)
            console.log('not success', e)
        }

    })
}
const postGenus = async (genusData) => {
    try {
        const genus = await Genus.create({

            genus_name: genusData.genus_name,
            family_id: genusData.family_id
        });
        return genus;
    } catch (error) {
        console.error("Error creating a new genus: ", error.message);
        throw error;
    }
}


module.exports = {
    createGenus,
    updateGenus,
    deleteGenus,
    postGenus
}