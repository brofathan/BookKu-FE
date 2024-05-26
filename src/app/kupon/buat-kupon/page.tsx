"use client";
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
    const [formData, setFormData] = useState({
        nama: '',
        jenisKupon:'',
        kode: '',
        persentase: 0,
        potonganHarga: '',
        hargaMinimum: 0,
        hargaMaksimum: 0,
        tanggalMulai: new Date(),
        tanggalSelesai: new Date(),
        statusKupon: false,
        valid: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
            
        });
    };

    const handleStartDateChange = (date: Date) => {
        setFormData({
            ...formData,
            tanggalMulai: date
        });
    };

    const handleEndDateChange = (date: Date) => {
        setFormData({
            ...formData,
            tanggalMulai: date
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    useEffect(() => {
        // Add any necessary side effects here
    }, []);

    return (
        <div className="mt-20">
            <div className="p-20">
                <form onSubmit={handleSubmit} className="bg-gray-100 bg-opacity-30 backdrop-blur-md backdrop-filter backdrop-blur-md shadow rounded-3xl px-8 pt-6 pb-8 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nama:
                            <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2" />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Kode Kupon:
                            <input type="text" name="kode" value={formData.kode} onChange={handleChange} className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2" />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nama:
                            <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2" />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Kode Kupon:
                            <input type="text"  name="kode" value={formData.kode} onChange={handleChange} className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2" />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Mulai:</label>
                            <DatePicker
                                selected={formData.tanggalMulai}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Selesai:</label>
                            <DatePicker
                                selected={formData.tanggalSelesai}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                                className=" custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                            />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 w-full">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Page;
