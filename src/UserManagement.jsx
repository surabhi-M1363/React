import React, { useEffect, useState } from 'react';
import api from '../api'; // Ensure correct API import

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/users')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error("Error fetching users:", error);
                setError("Failed to fetch user data. Please try again later.");
            });
    }, []);

    return (
        <div>
            <h2>User Management</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>
                            {user.username} - {user.email} ({user.role})
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserManagement;