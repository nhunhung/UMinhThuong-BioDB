const LocationSample = require('../models/LocationSampleModel');
const Provinces = require('../models/ProvincesModel');
const Districts = require('../models/DistrictsModel');
const Wards = require('../models/WardsModel');

/**
 * Lấy tất cả các địa điểm mẫu
 */
const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationSample.findAll({
            include: [
                { model: Provinces, attributes: ['province_name'] },
                { model: Districts, attributes: ['district_name'] },
                { model: Wards, attributes: ['ward_name'] },
            ],
        });
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Lấy thông tin chi tiết của một địa điểm mẫu
 */
const getLocationById = async (req, res) => {
    try {
        const location = await LocationSample.findByPk(req.params.id, {
            include: [
                { model: Provinces, attributes: ['province_name'] },
                { model: Districts, attributes: ['district_name'] },
                { model: Wards, attributes: ['ward_name'] },
            ],
        });
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Tạo mới một địa điểm mẫu
 */
const createLocation = async (req, res) => {
    try {
        const {
            country,
            provinces_id,
            districts_id,
            wards_id,
            collectionVillage,
            location,
            locationNotes,
            latitude,
            northSouth,
            longitude,
            eastWest,
            elevation,
            maxElevationRange,
            elevationUnit,
            vn2000Longitude,
            vn2000Latitude,
        } = req.body;

        const newLocation = await LocationSample.create({
            country,
            provinces_id,
            districts_id,
            wards_id,
            collectionVillage,
            location,
            locationNotes,
            latitude,
            northSouth,
            longitude,
            eastWest,
            elevation,
            maxElevationRange,
            elevationUnit,
            vn2000Longitude,
            vn2000Latitude,
        });

        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Cập nhật thông tin một địa điểm mẫu
 */
const updateLocation = async (req, res) => {
    try {
        const location = await LocationSample.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        const updatedLocation = await location.update(req.body);
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Xóa một địa điểm 
 */
const deleteLocation = async (req, res) => {
    try {
        const location = await LocationSample.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        await location.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
};
