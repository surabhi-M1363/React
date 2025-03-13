import React, { useState } from "react";
import api from "../api"; // Import API functions
import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleAuth = async () => {
        try {
            if (isLogin) {
                // Login Logic
                const userData = await api.loginUser({ username, password });
                if (userData.success) {
                    localStorage.setItem("token", userData.token); // Store JWT Token
                    setMessage("Login successful!");
                    navigate("/dashboard"); // Redirect to the dashboard (main modules)
                } else {
                    setMessage(userData.message || "Login failed");
                }
            } else {
                // Signup Logic
                const userData = await api.registerUser({ username, password });
                if (userData.success) {
                    setMessage("Signup successful! Please login.");
                    setIsLogin(true); // Switch to login after signup
                } else {
                    setMessage(userData.message || "Signup failed");
                }
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div>
            <h2>{isLogin ? "User Login" : "User Signup"}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                />
                <button type="button" onClick={handleAuth}>
                    {isLogin ? "Login" : "Signup"}
                </button>
            </form>
            <p>{message}</p>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
                {isLogin ? "New user? Sign up here" : "Already have an account? Login here"}
            </p>
        </div>
    );
};

export default Authentication;