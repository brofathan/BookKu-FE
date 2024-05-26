"use client";

import React, { useState } from 'react';

const NavbarPembeli: React.FC = () => {
    const [activeButton, setActiveButton] = useState('Beranda'); // Set "Beranda" as the default active state

    const handleButtonClick = (buttonName: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setActiveButton(buttonName);
    };

    const handleBookKuClick = () => {
        setActiveButton('Beranda'); // Set "Beranda" as the default active state
    };

    return (
        <div className="fixed top-8 left-8 right-8 bg-blue-400 bg-opacity-30 backdrop-blur-md p-6 shadow-lg flex justify-between items-center rounded-3xl z-50 border-opacity-0" style={{ height: '90px', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center">
                <a href="/" className="text-2xl font-bold font-poppins" onClick={handleBookKuClick}>BookKu</a>
            </div>
            <div className="flex items-center space-x-4" style={{ paddingRight: '20px' }}>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Beranda' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={(e) => handleButtonClick('Beranda', e)}>Beranda</a>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Profil' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={(e) => handleButtonClick('Profil', e)}>Profil</a>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Cart' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={(e) => handleButtonClick('Cart', e)}>Cart</a>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Histori' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={(e) => handleButtonClick('Histori', e)}>Histori</a>
            </div>
        </div>
    );
};

export default NavbarPembeli;

