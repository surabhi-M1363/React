import express from 'express';
import { Location } from '../models/index.js';

const routerMapping = express.Router();

routerMapping.get('/', async(req, res) => {
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

routerMapping.post('/add', async(req, res) => {
    try {
        const { name, description } = req.body;
        const location = await Location.create({ name, description });
        res.status(201).json(location);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

export default routerMapping;