import express from 'express';
import { Accident } from '../models/index.js'; // Import Accident model

const routerLocation = express.Router();

// Get all accident locations
routerLocation.get("/", async(req, res) => {
    try {
        const accidents = await Accident.findAll({
            attributes: ['latitude', 'longitude'] // Only return lat/lng
        });
        res.json(accidents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default routerLocation;