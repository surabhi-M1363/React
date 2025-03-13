import express from 'express';
import { Notification } from '../models/index.js'; // Import Notification model

const routerNotification = express.Router();

// Get all notifications
routerNotification.get("/", async(req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default routerNotification;