import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

const Authentication = ({ setIsAuthenticated }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = (e) => {
        e.preventDefault();
        if (isSignup) {
            // Signup Logic - Save credentials to localStorage
            if (localStorage.getItem(username)) {
                alert("User already exists! Please log in.");
            } else {
                localStorage.setItem(username, password);
                alert("Signup successful! Please log in.");
                setIsSignup(false);
            }} else {
                // Login Logic - Check credentials
                const storedPassword = localStorage.getItem(username);
                if (storedPassword === password) {
                    setIsAuthenticated(true);
                    navigate('/'); // Redirect to home page
                } else {
                    alert("Invalid credentials! Please try again.");
                }
            }
        };
    
        return (
            <div>
                <h2>{isSignup ? "Signup" : "Login"}</h2>
                <form onSubmit={handleAuth}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">{isSignup ? "Signup" : "Login"}</button>
            </form>
            <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer', color: 'blue' }}>
                {isSignup ? "Already have an account? Login" : "New user? Signup here"}
            </p>
        </div>
    );
};

export default Authentication;
