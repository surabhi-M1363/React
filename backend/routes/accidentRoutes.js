import React, { useState } from "react";
import api from "../api"; // Ensure api.js has reportAccident function

const AccidentReporting = () => {
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!location || !description) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await api.reportAccident({ location, description, date: new Date() }); // Include date if needed
            setMessage("Accident reported successfully.");

            // Clear form after successful submission
            setLocation("");
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