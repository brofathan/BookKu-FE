'use client'
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

type CheckoutProduct = {
    productId: number;
    productName: string;
    price: number;
};

type CheckoutHistoryItem = {
    historyId: number;
    products: CheckoutProduct[];
    totalPrice: number;
};

const History: FC = () => {
    const [checkoutHistory, setCheckoutHistory] = useState<CheckoutHistoryItem[]>([]);

    useEffect(() => {
        const fetchCheckoutHistory = async () => {
            try {
                const response = await axios.get<CheckoutHistoryItem[]>('http://localhost:8080/histories');
                setCheckoutHistory(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCheckoutHistory();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Riwayat Checkout</h1>
            {checkoutHistory.length === 0 ? (
                <p className="text-gray-500">Tidak ada riwayat checkout.</p>
            ) : (
                <ul>
                    {checkoutHistory.map((checkout, index) => (
                        <li key={index} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-2">Checkout ID: {checkout.historyId}</h2>
                            <ul className="space-y-2">
                                {checkout.products.map((product, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{product.productName}</span>
                                        <span>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 mt-4">Total Price: {checkout.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default History;

