'use client'

import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    productId: number;
    productName: string;
    price: number;
}

interface Cart {
    cartId: number;
    products: Product[];
    totalPrice: number;
}

const CartPage: NextPage = () => {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<Cart>({ cartId: 0, products: [], totalPrice: 0 });

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/carts/1'); // Ganti URL dengan URL yang sesuai
                setCart(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);

    const handleCheckout = async () => {
        try {
            // Hapus data dari keranjang di database
            await axios.delete('http://localhost:8080/carts/1/products', {
                data: {
                    cartId: 1,
                    products: [],
                    totalPrice: 0.0
                }
            });

            // Kirim data ke riwayat pembelian
            await axios.post('http://localhost:8080/histories', {
                historyId: 4, // Anda mungkin perlu menghasilkan ID riwayat yang unik
                products: cart.products,
                totalPrice: cart.totalPrice
            });

            // Set keranjang kosong setelah checkout berhasil
            setCart({ cartId: 0, products: [], totalPrice: 0 });
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
            {loading ? (
                <p className="text-lg">Loading...</p>
            ) : (
                <>
                    {cart.products.length === 0 ? (
                        <p className="text-lg">Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="divide-y divide-gray-200">
                                {cart.products.map((product: Product) => (
                                    <li key={product.productId} className="py-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-lg font-semibold">{product.productName}</p>
                                            <p className="text-gray-500">${product.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex justify-between">
                                <p className="text-xl font-semibold">Total Price: ${cart.totalPrice}</p>
                                <button onClick={handleCheckout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Checkout
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CartPage;

