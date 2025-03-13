import React, { useEffect, useState } from 'react';
import api from '../api'; // Ensure correct API import

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/notifications')
            .then(response => setNotifications(response.data))
            .catch(error => {
                console.error("Error fetching notifications:", error);
                setError("Failed to fetch notifications. Please try again later.");
            });
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <li key={notification.id}>{notification.message}</li>
                    ))
                ) : (
                    <p>No new notifications.</p>
                )}
            </ul>
        </div>
    );
};

export default Notifications;