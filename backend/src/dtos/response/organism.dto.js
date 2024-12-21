class OrganismDTO {
    constructor(organism) {
        this["organism_id"] = organism.organism_id || 'N/A';
        this["goo"] = organism.GroupOfOrganism?.goo_name || 'N/A';  // Nhóm sinh vật
        this["order"] = organism.Order?.order_name || 'N/A';  // Lấy tên của Order nếu có, nếu không thì 'Unknown'
        this["family"] = organism.Family?.family_name || 'N/A'; // Họ
        this["genus"] = organism.Genus?.genus_name || 'N/A'; // Chi
        this["scientificName"] = organism.scientificName;  // Tên khoa học
        this["authorName"] = organism.authorName;  // Tên tác giả
        this["commonName"] = organism.commonName;  // Tên địa phương
    }
}

module.exports = OrganismDTO;

