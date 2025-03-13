import React, { useState } from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Authentication from './Auth/Authentication';
import Home from './Auth/Home';
//import './styles/App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="app-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {!isAuthenticated ? (
                        <li><Link to="/auth">Login / Signup</Link></li>
                    ) : (
                        <>
                            <li><button className="logout-btn" onClick={() => setIsAuthenticated(false)}>Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>

            {/* Routes Configuration */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Authentication setIsAuthenticated={setIsAuthenticated} />} />

                {/* Protected Route Example */}
                <Route path="/dashboard" element={isAuthenticated ? <h2>Welcome to Dashboard</h2> : <Navigate to="/auth" />} />
            </Routes>
        </div>
    );
};

export default App;
