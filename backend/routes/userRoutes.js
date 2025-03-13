import express from 'express';
import { User } from '../models/index.js'; // Import User model

const routerUser = express.Router();

// Get all users
routerUser.get("/", async(req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role'] // Exclude sensitive data
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default routerUser;