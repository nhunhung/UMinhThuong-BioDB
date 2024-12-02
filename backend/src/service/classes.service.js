const db = require("../config/database");
const { Class } = db;

const postClass = async (classesData) => {
    try {
        const class_sp = await Class.create({
            name: classesData.name,
            phylum_id: classesData.phylum_id
        });
        return class_sp;
    } catch (error) {
        console.error("Error creating a new class: ", error.message);
        throw error;
    }
}

module.exports = {
    postClass
}