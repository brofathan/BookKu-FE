"use client";

import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (buttonName: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setActiveButton(buttonName);
    };

    const handleBookKuClick = () => {
        setActiveButton('');
    };

    return (
        <div className="fixed top-8 left-8 right-8 bg-blue-400 bg-opacity-30 backdrop-blur-md p-6 shadow-lg flex justify-between items-center rounded-3xl z-50 border-opacity-0" style={{ height: '90px', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center">
                <a href="/" className="text-2xl font-bold font-poppins" onClick={handleBookKuClick}>BookKu</a>
            </div>
            <div className="flex items-center space-x-4" style={{ paddingRight: '20px' }}>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Login' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={(e) => handleButtonClick('Login', e)}>Login</a>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Register' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={(e) => handleButtonClick('Register', e)}>Register</a>
            </div>
        </div>
    );
};

export default Navbar;
