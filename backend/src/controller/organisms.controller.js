const { or, DatabaseError } = require('sequelize');
const OrganismDTO = require('../dtos/response/organism.dto');
const organismService = require('../service/organism.service');
const OrganismDetailsDTO = require('../dtos/response/organismDetails.dto');


const getAllOrganism = async (req, res) => {
  try {
    // Lấy danh sách organisms đã được ánh xạ từ service
    const organisms = await organismService.getAllOrganisms();
    const organismsDTO = organisms.map(organism => new OrganismDTO(organism));
    return res.status(200).json({organismsDTO});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getOrganismsByGroups = async (req, res) => {
  try {
    // Lấy các groupOfOrganismId từ query params (ví dụ: ?groupOfOrganismId=1&groupOfOrganismId=2 hoặc ?groupOfOrganismId=1)
    let { groupOfOrganismId } = req.query;
    console.log(groupOfOrganismId);
    // Nếu chỉ có một giá trị, nó sẽ là một chuỗi, chúng ta cần chuyển nó thành mảng
    if (typeof groupOfOrganismId === 'string') {
      groupOfOrganismId = [groupOfOrganismId];  // Chuyển thành mảng với 1 phần tử
    }

    // Chuyển mảng các ID thành kiểu số (chỉ lấy số nguyên)
    const groupIdsArray = groupOfOrganismId.map(id => parseInt(id, 10));

    // Kiểm tra nếu không có groupIdsArray nào
    if (groupIdsArray.length === 0) {
      return res.status(400).json({ message: "No group IDs provided" });
    }

    // Lấy organisms theo các groupId
    const organisms = await organismService.getOrganismsByGroups(groupIdsArray);

    // Chuyển đổi organisms thành DTO để trả về client
    const result = organisms.map(organism => new OrganismDTO(organism));

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Lấy organism theo Id 
const getOrganismById = async (req, res) => {
  const { organism_Id } = req.params;
  console.log(organism_Id);
  try {
    // Lấy organism từ service
    const organisms = await organismService.getOrganinsmById(organism_Id);

    // Kiểm tra organism không tồn tại và trả lỗi
    if (!organisms) return res.status(404).json({ message: 'Organism not found' });

    // Trả về DTO trực tiếp
    return res.status(200).json(new OrganismDetailsDTO(organisms));

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getOrganismByNames = async (req, res) => {
  const kw = req.query.kw;  // Lấy từ khóa tìm kiếm từ query (kw)

  try {
    // Gọi service để tìm organisms theo từ khóa
    const organisms = await organismService.getOrganismByNames(kw);

    // Kiểm tra xem organisms có phải là một mảng không
    if (!Array.isArray(organisms) || organisms.length === 0) {
      return res.status(404).json({ message: 'Organism not found' });
    }

    // Ánh xạ organisms qua DTO
    const organismsDTO = organisms.map(organism => new OrganismDTO(organism));    

    // Trả về kết quả
    return res.status(200).json({ organisms: organismsDTO });
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const updateOrganism = async (req, res) => {
  const { organism_Id } = req.params;
  const data = req.body;
  try {
    const organism = await organismService.getOrganinsmById(organism_Id);

    if (!organism) return res.status(404).json({ message: 'Organism not found ' })

    await organismService.updateOrganism(organism_Id, data);

    res.json({ message: 'Organism updated successfully', organism });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const statisticOrganism = async (req, res) => {
  try {
    const { groupOfOrganismId } = req.query;

    console.log(groupOfOrganismId);
    
    if (!groupOfOrganismId) {
      return res.status(400).json({ message: 'groupOfOrganismId is required' });
    }

    // Chuyển groupOfOrganismId thành mảng nếu nó là chuỗi
    const groupIds = Array.isArray(groupOfOrganismId) ? groupOfOrganismId : [groupOfOrganismId];

    // Gọi service để lấy thống kê từ cơ sở dữ liệu
    const statistics = await organismService.statisticOrganisms(groupIds);

    // Trả về dữ liệu đã được chuyển thành DTO
    return res.status(200).json(statistics);
  } catch (error) {
    console.error('Error fetching organism statistics:', error);
    return res.status(500).json({ message: 'Error fetching organism statistics' });
  }
};



const deleteOrganismController = async (req, res) => {
  const { organism_Id } = req.params; // Lấy ID từ URL params
  try {
    const result = await organismService.deleteOrganism(organism_Id); // Gọi hàm delete
    res.status(200).json(result); // Trả về thông báo thành công
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Trả về lỗi nếu có
  }
};

module.exports = {
  getAllOrganism,
  getOrganismsByGroups,
  getOrganismById,
  deleteOrganismController,
  updateOrganism,
  statisticOrganism,
  getOrganismByNames
};
