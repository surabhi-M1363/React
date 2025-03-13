import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import api from '../api'; // Import API

const containerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter = {
    lat: 17.385044, // Default Hyderabad location
    lng: 78.486671
};

const MappingLocation = () => {
    const [accidentLocations, setAccidentLocations] = useState([]);

    useEffect(() => {
        api.getAccidentLocations()
            .then((data) => setAccidentLocations(data))
            .catch((error) => console.error("Error fetching locations:", error));
    }, []);

    return (
        <div>
            <h2>Mapping & Location</h2>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={12}>
                    {accidentLocations.map((loc, index) => (
                        <Marker key={index} position={{ lat: loc.latitude, lng: loc.longitude }} />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MappingLocation;