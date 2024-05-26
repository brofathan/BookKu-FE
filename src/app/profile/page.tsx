'use client';
import React, { useEffect, useState } from 'react';

// AUTHORIZATION IMPORTS //
import Authservice from '../misc/Authservice';
import '../misc/loading.css';
// AUTHORIZATION IMPORTS //

const Profile: React.FC = () => {

    // AUTHORIZATION //
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authorizeUser = async () => {
          try {
            await Authservice.authorize('user');
          } finally {
            setLoading(false);
          }
        };
        
        authorizeUser();
      }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }
    // AUTHORIZATION //

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
};

export default Profile;