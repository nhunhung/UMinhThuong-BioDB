const Organism = require('../models/OrganismModel');
const LocationSample = require('../models/LocationSampleModel');
const Sample = require('../models/SampleModel');

class MapService {
    /**
     * Lấy dữ liệu các sinh vật và vị trí liên quan để hiển thị trên bản đồ.
     * @returns {Promise<Array>} Danh sách sinh vật và vị trí.
     */
    static async getOrganismsWithLocations() {
        try {
            const organisms = await Organism.findAll({
                include: {
                    model: LocationSample,
                    through: {
                        model: Sample,
                        attributes: [] // Không lấy dữ liệu từ bảng trung gian
                    },
                    attributes: ['latitude', 'longitude', 'location'] // Lấy thông tin vị trí
                },
            });

            // Chuyển đổi dữ liệu thành định dạng dễ sử dụng cho frontend
            return organisms.map(organism => ({
                organismId: organism.organism_id,
                speciesName: organism.speciesNameLevel1,
                commonName: organism.commonName,
                locations: organism.LocationSamples.map(location => ({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    locationName: location.location,
                })),
            }));
        } catch (error) {
            console.error('Error in MapService.getOrganismsWithLocations:', error);
            throw new Error('Unable to fetch organisms and their locations');
        }
    }
}

module.exports = MapService;
