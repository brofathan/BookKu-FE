'use client';
import React, { useState } from 'react';
import Popup from '../misc/popup';

const Login: React.FC = () => {

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {setShowPopup(false);};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://34.66.73.124/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd'
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());

      if (!response.message) {
        
        const { accessToken, refreshToken } = response;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        window.location.href = '/';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setPopupMessage(error + '');
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>

          {/* Register link */}
          <p className="mt-4 text-center">
              Don&apos;t have an account? <a href="/register" className="text-blue-500">Register</a>
          </p>
        </form>
      </div>
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
};

export default Login;