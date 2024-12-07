const OrganismDTO = require('./organism.dto');

class OrganismDetailsDTO extends OrganismDTO {
    constructor(organism) {
        super(organism);
        // Kiểm tra nếu giá trị là null hoặc undefined thì gán "N/A"
        this['Giới'] = organism.Kingdom?.name || 'N/A';
        this['Ngành'] = organism.Phylum?.name || 'N/A';
        this['Lớp'] = organism.Class?.name || 'N/A';
        this['Đặc điểm hình thái'] = organism.speciesDescription || 'N/A';
        this['Sinh cảnh sống'] = organism.habitat || 'N/A';
        this['Khu vực phân bố'] = organism.distributionA || 'N/A';
    }
}

module.exports = OrganismDetailsDTO;
