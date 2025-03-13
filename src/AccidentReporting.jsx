import React, { useState } from "react";
import api from "../api"; // Ensure api.js has reportAccident function

const AccidentReporting = () => {
    const [location, setLocation] = useState("");
    const [severity, setSeverity] = useState("Minor"); // Default severity
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!location || !description) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await api.reportAccident({ location, severity, description });
            setMessage(response.data.message || "Accident reported successfully.");
            
            // Clear fields after successful submission
            setLocation("");
            setSeverity("Minor");
            setDescription("");
        } catch (error) {
            setMessage(error.response?.data?.error || "Error reporting accident.");
        }
    };

    return (
        <div>
            <h2>Report Accident</h2>
            <input 
                type="text" 
                placeholder="Location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
            />

            {/* Dropdown for severity selection */}
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Fatal">Fatal</option>
            </select>

            <textarea 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />

            <button onClick={handleSubmit}>Submit Report</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AccidentReporting;