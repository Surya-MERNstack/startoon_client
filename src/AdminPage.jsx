import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:5000/crud/admin');
                console.log(response.data.message)
                setAdmins(response.data);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };
        fetchAdmins();
    }, []);

    return (
        <div>
            <h1>Admins</h1>
            <ul>
                {admins.map((admin, index) => (
                    <li key={index}>
                        <strong>Username:</strong> {admin.username}<br />
                        <strong>Email:</strong> {admin.email}<br />
                        <strong>Created At:</strong> {new Date(admin.createdAt).toLocaleString()}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
