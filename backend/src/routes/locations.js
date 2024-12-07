const express = require('express');
const routerAPI = express.Router();
const {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} = require('../controller/LocationSampleController');

const LocationSample = require('../models/LocationSampleModel');


// Lấy danh sách tất cả địa điểm mẫu
routerAPI.get('/', async (req, res) => {
    try {
        const locations = await LocationSample.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lấy thông tin chi tiết của một địa điểm
routerAPI.get('/:id', async (req, res) => {
    try {
        const location = await LocationSample.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Thêm một địa điểm mới
routerAPI.post('/add', async (req, res) => {
    try {
        const newLocation = await LocationSample.create(req.body);
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cập nhật thông tin địa điểm
routerAPI.put('/:id', async (req, res) => {
    try {
        const location = await LocationSample.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        await location.update(req.body);
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Xóa một địa điểm
routerAPI.delete('/:id', async (req, res) => {
    try {
        const location = await LocationSample.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        await location.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = routerAPI;
