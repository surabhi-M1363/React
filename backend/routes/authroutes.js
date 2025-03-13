import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const routerAuth = express.Router();
const SECRET_KEY = "your_secret_key"; // Change this in production

// Signup Route
routerAuth.post("/signup", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ success: false, message: "Username already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ success: true, message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Login Route
routerAuth.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default routerAuth;