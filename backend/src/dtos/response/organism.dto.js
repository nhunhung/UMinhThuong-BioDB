class OrganismDTO {
    constructor(organism) {
        this["Nhóm sinh vật"] = organism.GroupOfOrganism?.name || 'N/A';  // Nhóm sinh vật
        this["Bộ"] = organism.Order?.name || 'N/A';  // Lấy tên của Order nếu có, nếu không thì 'Unknown'
        this["Họ"] = organism.Family?.name || 'N/A'; // Họ
        this["Chi"] = organism.Genus?.name || 'N/A'; // Chi
        this["Tên khoa học"] = organism.scientificName;  // Tên khoa học
        this["Tên tác giả"] = organism.authorName;  // Tên tác giả
        this["Tên địa phương"] = organism.commonName;  // Tên địa phương
    }
}

module.exports = OrganismDTO;

