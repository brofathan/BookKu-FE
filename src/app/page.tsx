import React from 'react';

const Home: React.FC = () => {
  const user = "John";

  return (
    <div className="p-20 text-right flex flex-col items-end">
      <h1 className="text-3xl">Selamat Datang</h1>
      <div className="flex items-center justify-end w-full">
        <div className="bg-blue-900 text-white rounded-full px-16 py-4 mr-auto text-xl font-bold">
          10 Koleksi Teratas
        </div>
        <h1 className="text-8xl font-black" style={{ color: '#000e8b' }}>{user}</h1>
      </div>
    </div>
  );
};

export default Home;
