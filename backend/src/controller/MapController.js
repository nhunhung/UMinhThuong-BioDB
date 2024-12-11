const { Op } = require('sequelize');
const Organism = require('../models/OrganismModel');
const LocationSample = require('../models/LocationSampleModel');
const Sample = require('../models/SampleModel');
const MapService = require('../models/MapService');

async function getOrganismsWithLocation(req, res) {
    try {
        const organisms = await Organism.findAll({
            include: {
                model: LocationSample,
                through: {
                    model: Sample,
                    attributes: []
                },
                attributes: ['latitude', 'longitude', 'location']
            },
        });

        // Chuan bi data cho frontend (Map)
        const organismsLocationData = organisms.map(organism => ({
            organismId: organism.organism_id,
            speciesName: organism.speciesNameLevel1,
            commonName: organism.commonName,
            location: organism.LocationSamples.map(location => ({
                latitude: location.latitude,
                longitude: location.longitude,
                locationName: location.location,
            }))
        }));

        return res.status(200).json(organismsLocationData);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching organisms and locations', error });
    }
}

module.exports = { getOrganismsWithLocation };
