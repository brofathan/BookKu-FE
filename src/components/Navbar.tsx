"use client";
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [activeButton, setActiveButton] = useState('Beranda');

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
        // Change the URL based on the button clicked
        if (buttonName === 'Beranda') {
            window.location.href = '/';
        } else if (buttonName === 'Profil') {
            window.location.href = '/profile';
        } else if (buttonName === 'Cart') {
            window.location.href = '/cart';
        } else if (buttonName === 'Histori') {
            window.location.href = '/history';
        } else if (buttonName === 'Kelola Kupon') {
            window.location.href = '/kupon'; // Adjust the route for Kelola Kupon
        } else if (buttonName === 'Dashboard') {
            window.location.href = '/dashboard'; // Adjust the route for Dashboard
        }
    };

    const handleBookKuClick = () => {
        setActiveButton('Beranda'); // Set "Beranda" as the default active state
        window.location.href = '/';
    };

    return (
        <div className="fixed top-8 left-8 right-8 bg-blue-400 bg-opacity-30 backdrop-blur-md p-6 shadow-lg flex justify-between items-center rounded-3xl z-50 border-opacity-0" style={{ height: '90px', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center">
                <a href="/" className="text-2xl font-bold font-poppins" onClick={handleBookKuClick}>BookKu</a> {/* Use anchor tag for BookKu */}
            </div>
            <div className="flex items-center space-x-4" style={{ paddingRight: '20px' }}>
                <a href="/" className={`text-lg font-medium ${activeButton === 'Beranda' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={() => handleButtonClick('Beranda')}>Beranda</a>
                <a href="/profile" className={`text-lg font-medium ${activeButton === 'Profil' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={() => handleButtonClick('Profil')}>Profil</a>
                <a href="/cart" className={`text-lg font-medium ${activeButton === 'Cart' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={() => handleButtonClick('Cart')}>Cart</a>
                <a href="/history" className={`text-lg font-medium ${activeButton === 'Histori' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={() => handleButtonClick('Histori')}>Histori</a>
                <a href="/kupon" className={`text-lg font-medium ${activeButton === 'Kelola Kupon' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={() => handleButtonClick('Kelola Kupon')}>Kelola Kupon</a>
                <a href="/dashboard" className={`text-lg font-medium ${activeButton === 'Dashboard' ? 'bg-white rounded-full px-4 py-2 shadow-inner custom-inner-shadow' : ''}`} onClick={() => handleButtonClick('Dashboard')}>Dashboard</a>
            </div>
        </div>
    );
};

export default Navbar;
