"use client";
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { FiArrowLeft } from 'react-icons/fi'; 
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'


import "react-datepicker/dist/react-datepicker.css";

const EditKupon: React.FC = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    const [formData, setFormData] = useState({
        nama: '',
        jenisKupon:'',
        kode: '',
        persentase: 0,
        potonganHarga: '0',
        hargaMinimum: 0,
        hargaMaksimum: 0,
        tangalMulai: new Date(),
        tanggalSelesai: new Date(),
        statusKupon: false,
    });

    const [checkboxState, setCheckboxState] = useState({
        hargaMinimum: false,
        hargaMaksimum: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'persentase' ? parseFloat(value) : value
        });
    };

    const handleChangeChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStartDateChange = (date: Date) => {
        setFormData({
            ...formData,
            tangalMulai: date
        });
    };

    const handleEndDateChange = (date: Date) => {
        setFormData({
            ...formData,
            tanggalSelesai: date
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://34.87.61.85/update-kupon/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Kupon berhasil diperbarui');
                router.push('/kupon');
            } else {
                alert('Terjadi kesalahan saat memperbarui kupon');
            }
        } catch (error) {
            console.error('Error updating kupon:', error);
            alert('Terjadi kesalahan saat memperbarui kupon');
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCheckboxState({
            ...checkboxState,
            [name]: checked
        });
        setFormData({
            ...formData,
            [name as keyof typeof formData]: checked ? formData[name as keyof typeof formData] : 0
        });
    };

    const handleStatusKuponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            statusKupon: e.target.checked
        });
    };

    useEffect(() => {
        if (!id) return;
        const fetchKupon = async () => {
            try {
                const response = await fetch(`http://34.87.61.85/kupon/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData(data);
                setCheckboxState({
                    hargaMinimum: data.hargaMinimum > 0,
                    hargaMaksimum: data.hargaMaksimum > 0
                });
            } catch (error) {
                console.error('Error fetching kupon:', error);
            }
        };
        fetchKupon();
    }, [id]);

    return (
        <div className="mt-20">
            <div className="p-20">
            <div className="flex items-center justify-between mb-4"> {/* Updated flex container */}
                <a href = "/kupon">
                    <button className="bg-blue-800 text-white rounded-full p-2 shadow mr-4">
                        <FiArrowLeft className="h-8 w-8" />
                    </button>
                    </a>
                <h1 className="text-4xl font-poppins font-bold mb-2 mr-auto">Buat Kupon</h1>
            </div>

                <form onSubmit={handleSubmit} className="bg-gray-100 bg-opacity-30 backdrop-blur-md shadow rounded-3xl px-8 pt-6 pb-8 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nama:
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Kode Kupon:
                            <input
                                type="text"
                                name="kode"
                                value={formData.kode}
                                onChange={handleChange}
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Jenis Kupon:
                            <select
                                name="jenisKupon"
                                value={formData.jenisKupon}
                                onChange={handleChangeChoice}
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                            >
                                <option value="Persentase">Persentase</option>
                                <option value="Potongan harga">Potongan harga</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        {formData.jenisKupon && (
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {formData.jenisKupon === 'Persentase' ? 'Persentase:' : 'Potongan harga:'}
                                <input
                                    type="text"
                                    name={formData.jenisKupon === 'Persentase' ? 'persentase' : 'potonganHarga'}
                                    value={formData.jenisKupon === 'Persentase' ? formData.persentase : formData.potonganHarga}
                                    onChange={handleChange}
                                    className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                                />
                            </label>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Minimal Harga:
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="hargaMinimum"
                                checked={checkboxState.hargaMinimum}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                                style={{ height: '20px', width: '20px', borderRadius: '50%' }}
                            />
                            <input
                                type="text"
                                name="hargaMinimum"
                                value={formData.hargaMinimum}
                                onChange={handleChange}
                                disabled={!checkboxState.hargaMinimum}
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl"
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Potongan Maksimal:
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="hargaMaksimum"
                                checked={checkboxState.hargaMaksimum}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                                style={{ height: '20px', width: '20px', borderRadius: '50%' }}
                            />
                            <input
                                type="text"
                                name="hargaMaksimum"
                                value={formData.hargaMaksimum}
                                onChange={handleChange}
                                disabled={!checkboxState.hargaMaksimum}
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl"
                            />
                        </div>
                    </div>
                    <p className=' block text-gray-700 text-sm font-bold mb-2'>Status Kupon:</p>
                    <div className="flex items-center mb-4 mt-4">
                        <input
                            type="checkbox"
                            name="statusKupon"
                            checked={formData.statusKupon}
                            onChange={handleStatusKuponChange}
                            className="mr-2"
                            style={{ height: '20px', width: '20px', borderRadius: '50%' }}
                        />
                        <label className="text-gray-700 text-sm">
                            Kupon Aktif
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Mulai:</label>
                            <DatePicker
                                selected={formData.tangalMulai}
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
                                className="custom-inner-shadow-input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-3xl mt-2"
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 w-full">Edit</button>
                </form>
            </div>
        </div>
    );
};

export default EditKupon;
