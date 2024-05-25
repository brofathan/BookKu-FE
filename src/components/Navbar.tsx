import React from 'react';

const Navbar: React.FC = () => {
    return (
        <div className="fixed top-8 left-8 right-8 bg-gray-200 bg-opacity-30 backdrop-blur-md p-6 shadow-lg flex justify-between items-center rounded-3xl z-50 border-opacity-0" style={{ height: '90px', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center">
                <div className="text-2xl font-bold font-poppins ">BookKu</div>
            </div>
            <div className="flex space-x-4" style={{ paddingRight: '20px' }}>
                <a href="/" className="text-lg font-medium">Login</a>
                <a href="/about" className="text-lg font-medium">Register</a>
            </div>
        </div>
    );
};

export default Navbar;
