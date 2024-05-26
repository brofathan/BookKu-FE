'use client';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { FaHistory, FaProductHunt } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

type Product = {
    productId: number;
    productName: string;
    price: number;
    imageUrl: string;
};

type PaidCheckout = {
    cartId: number;
    products: Product[];
    totalPrice: number;
};

type CheckoutHistoryItem = {
    historyId: number;
    paidCheckouts: PaidCheckout[];
};

const History: FC = () => {
    const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistoryItem | null>(null);
    const [historyId, setHistoryId] = useState<number | null>(null);

    const authHeaders = {
        'Content-Type': 'application/json',
        'X-API-KEY': 'KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd',
        'Authorization': `${localStorage.getItem('accessToken')}`,
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://34.66.73.124/account/get-account', { headers: authHeaders });
            setHistoryId(response.data.historyId);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchCheckoutHistory = async (historyId: number) => {
        try {
            const response = await axios.get<CheckoutHistoryItem>(`http://34.101.88.254/histories/${historyId}`, { headers: authHeaders });
            setCheckoutHistory(response.data);
        } catch (error) {
            console.error('Error fetching checkout history:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (historyId !== null) {
            fetchCheckoutHistory(historyId);
        }
    }, [historyId]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                    <FaHistory className="text-4xl text-blue-600" />
                    <h1 className="text-3xl font-extrabold text-gray-900">Riwayat Checkout</h1>
                </div>
                {!checkoutHistory ? (
                    <p className="text-lg text-gray-700">Loading...</p>
                ) : checkoutHistory.paidCheckouts.length === 0 ? (
                    <p className="text-lg text-gray-700">You haven't checked out anything yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {checkoutHistory.paidCheckouts.map((checkout, index) => (
                            <li key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                    <FaHistory className="mr-2 text-blue-600" />
                                </h2>
                                <div className="space-y-2">
                                    {checkout.products.map((product, productIndex) => (
                                        <div key={productIndex} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                                            <img src={product.imageUrl} alt={product.productName} className="w-16 h-16 object-cover rounded-md" />
                                            <div>
                                                <div className="flex items-center">
                                                    <FaProductHunt className="mr-2 text-green-600" />
                                                    <span className="text-lg">{product.productName}</span>
                                                </div>
                                                <p className="text-lg">Price: {product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xl font-semibold text-gray-900 mt-4 flex items-center">
                                    <MdAttachMoney className="mr-2 text-yellow-500" />
                                    Total Price: {checkout.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default History;