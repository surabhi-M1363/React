// src/AccidentManagementSystem/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Accident Management System</h1>
                <p>Efficiently report, track, and analyze accident incidents in real time.</p>
            </header>
            <div className="home-buttons">
                <Link to="/report" className="home-btn">Report Accident</Link>
                <Link to="/track" className="home-btn">Track Incidents</Link>
                <Link to="/analytics" className="home-btn">View Analytics</Link>
            </div>
        </div>
    );
};

export default Home;