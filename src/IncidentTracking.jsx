import React, { useEffect, useState } from 'react';
import api from '../api.js';

const IncidentTracking = () => {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.getIncidents().then(setIncidents).catch(error => {
            console.error("Error fetching incidents:", error);
        });
    }, []);

    return (
        <div>
            <h2>Incident Tracking</h2>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>{incident.type}: {incident.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default IncidentTracking;