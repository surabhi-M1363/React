import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Ash4545",
    database: "accident_management_system",
};

app.post("/auth/register", async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const db = await mysql.createConnection(dbConfig);
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        await db.end();
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});

app.post("/auth/login", async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const db = await mysql.createConnection(dbConfig);
        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        await db.end();

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, "secret_key", { expiresIn: "1h" });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});