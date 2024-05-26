'use client';
// Register.tsx
import React, { useState } from 'react';
import Popup from '../misc/popup';

const Register: React.FC = () => {

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user',
    name: '',
    email: '',
    phone: '',
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://34.66.73.124/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd'
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setPopupMessage('Register success');
      } else {
        const resp = await response.json();
        throw new Error(resp.message);
      }
    } catch (error) {
      setPopupMessage(error + '');
    }
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Redirect to login page after successful registration
    if (popupMessage === 'Register success') {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Register</button>

            {/* Login link */}
            <p className="mt-4 text-center">
                Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </p>
        </form>
        {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
      </div>
    </div>
  );
};

export default Register;
