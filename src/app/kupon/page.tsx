"use client";
import React, { useEffect, useState } from 'react';

interface Kupon {
    id: string;
    nama: string;
    jenisKupon: string;
    kode: string;
    persentase: number;
    potonganHarga: string;
    hargaMinimum: number;
    hargaMaksimum: number;
    tangalMulai: string;
    tanggalSelesai: string;
    statusKupon: boolean;
    valid: boolean;
}

const DaftarKupon: React.FC = () => {
    const user = "John";
    const [kupons, setKupons] = useState<Kupon[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchKupons = async () => {
            try {
                const response = await fetch('http://34.87.61.85/semua-kupon');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched kupons:', data); // Debug log to check data structure
                const modifiedKupons = data.map((kupon: Kupon) => {
                    let modifiedJenis = "";
                    if (kupon.jenisKupon.includes("D")) {
                        modifiedJenis += "Diskon";
                    }
                    if (kupon.jenisKupon.includes("P")) {
                        modifiedJenis += " persentase";
                    }
                    if (kupon.jenisKupon.includes("H")) {
                        modifiedJenis += " harga";
                    }
                    if (kupon.jenisKupon.includes("MIN")) {
                        modifiedJenis += " dengan minimum";
                    }
                    if (kupon.jenisKupon.includes("MAKS")) {
                        modifiedJenis += " dengan maksimum";
                    }
                    return {
                        ...kupon,
                        jenisKupon: modifiedJenis,
                    };
                });
                setKupons(modifiedKupons);
            } catch (error) {
                console.error('Error fetching kupons:', error);
            }
        };

        fetchKupons();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = kupons.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(kupons.length / itemsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    console.log('Current items:', currentItems); // Debug log to check current items

    return (
        <div className="p-20">
            <div className="flex items-center justify-starts mb-4"> {/* Added flex container */}
                <h1 className="text-4xl font-poppins font-bold mb-2">Semua Kupon</h1>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg ml-4"> {/* Added shadow to button */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((kupon, index) => (
                    <div key={index} className="bg-white p-6 rounded-3xl shadow relative"> {/* Modified rounded class */}
                        <button className="bg-red-500 text font-bold font-poppins text-white py-2 px-4 rounded-full absolute top-6 right-6">
                            Hapus
                        </button>
                        <h2 className="text-2xl font-poppins font-bold mb-2">{kupon.nama}</h2>
                        <p className="text-gray-700">Jenis: {kupon.jenisKupon}</p>
                        <p className="text-gray-700">Kode: {kupon.kode}</p>
                        <p className="text-gray-700">Persentase: {kupon.persentase}</p>
                        <p className="text-gray-700">Potongan Harga: {kupon.potonganHarga}</p>
                        <p className="text-gray-700">Harga Minimum: {kupon.hargaMinimum}</p>
                        <p className="text-gray-700">Harga Maksimum: {kupon.hargaMaksimum}</p>
                        <p className="text-gray-700">Tanggal Mulai: {kupon.tangalMulai}</p>
                        <p className="text-gray-700">Tanggal Selesai: {kupon.tanggalSelesai}</p>
                        <p className="text-gray-700">Status Kupon: {kupon.statusKupon ? 'Active' : 'Inactive'}</p>
                        <p className="text-gray-700">Valid: {kupon.valid ? 'Yes' : 'No'}</p>
                        <button className="bg-blue-500 font-bold font-poppins text-white py-2 px-4 rounded-full mt-2 w-full">
                            Ubah Kupon
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DaftarKupon;