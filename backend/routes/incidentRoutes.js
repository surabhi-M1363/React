import express from "express";
import { Incident } from "../models/index.js"; // Assuming you have an Incident model

const routerIncident = express.Router();

// Fetch all incidents
routerIncident.get("/", async(req, res) => {
    try {
        const incidents = await Incident.findAll();
        res.json(incidents);
    } catch (err) {
        res.status(500).json({ error: "Error fetching incidents" });
    }
});

// Add a new incident
routerIncident.post("/", async(req, res) => {
    try {
        const { type, description } = req.body;
        const newIncident = await Incident.create({ type, description });
        res.status(201).json(newIncident);
    } catch (err) {
        res.status(500).json({ error: "Error creating incident" });
    }
});

export default routerIncident;