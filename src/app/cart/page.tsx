'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { NextPage } from 'next';

interface Product {
    productId: number;
    productName: string;
    price: number;
    imageUrl: string;
    tokenBuku: string;
}

interface History {
    historyId: number;
    paidCheckouts: Cart[];
}

interface Cart {
    cartId: number;
    products: Product[];
    totalPrice: number;
}

interface Coupon {
    id: string;
    kode: string;
    potonganHarga: string;
    persentase: number;
    nama: string;
    tangalMulai: string;
    tanggalSelesai: string;
    statusKupon: boolean;
    jenisKupon: string;
    hargaMinimum: number;
    hargaMaksimum: number;
    valid: boolean;
}

const CartPage: NextPage = () => {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<Cart | null>(null);
    const [paidCheckouts, setPaidCheckouts] = useState(0);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [discount, setDiscount] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState<{ cartId: number, historyId: number } | null>(null);

    const authHeaders = {
        'Content-Type': 'application/json',
        'X-API-KEY': 'KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd',
        'Authorization': typeof window !== 'undefined' ? `${localStorage.getItem('accessToken')}` : '',
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://34.66.73.124/account/get-account', { headers: authHeaders });
            setUserData({ cartId: response.data.cartId, historyId: response.data.historyId });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchCartData = async (cartId: number) => {
        console.log(userData)
        console.log("^^^cek")
        try {
            const response = await axios.get<Cart>(`http://34.101.88.254/carts/${cartId}`, { headers: authHeaders });
            setCart(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setLoading(false);
        }
    };

    const fetchHistoryData = async (historyId: number) => {
        try {
            const response = await axios.get<History>(`http://34.101.88.254/histories/${historyId}`, { headers: authHeaders });
            setPaidCheckouts(response.data.paidCheckouts.length);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const fetchCoupons = async () => {
        try {
            const response = await axios.get<Coupon[]>('http://34.87.61.85/semua-kupon', { headers: authHeaders });
            // Filter only valid coupons
            const validCoupons = response.data.filter(coupon => coupon.valid);
            const numCoupons = paidCheckouts >= 20 ? 10 : paidCheckouts >= 10 ? 5 : paidCheckouts >= 5 ? 3 : 0;
            const shuffled = validCoupons.sort(() => 0.5 - Math.random());
            setCoupons(shuffled.slice(0, numCoupons));
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userData) {
            fetchCartData(userData.cartId);
            fetchHistoryData(userData.historyId);
        }
    }, [userData]);

    useEffect(() => {
        if (paidCheckouts >= 5) {
            fetchCoupons();
        }
    }, [paidCheckouts]);

    const handleCheckout = async () => {
        try {
            if (!cart || !cart.products.length || !userData) {
                console.error('Cart is empty or user data not available');
                return;
            }

            // Kirim setiap produk dalam keranjang ke endpoint book/buy
            for (const product of cart.products) {
                await axios.post('http://34.87.170.153/book/buy', {
                    id: product.tokenBuku,
                    quantity: 1
                }, { headers: authHeaders });
            }

            // Setelah semua produk dikirim, lanjutkan dengan proses checkout seperti biasa
            await axios.post('http://34.101.88.254/histories', [], { headers: authHeaders });
            const productData: Array<object> = cart.products.map(product => ({
                productName: product.productName,
                price: product.price,
                imageUrl: product.imageUrl,
                tokenBuku: product.tokenBuku
            }));

            await axios.post(`http://34.101.88.254/histories/${userData.historyId}/add-cart`, {
                products: productData,
                totalPrice: isCouponApplied ? discount : cart.totalPrice // Gunakan diskon jika kupon diterapkan
            }, { headers: authHeaders });

            await axios.put(`http://34.101.88.254/carts/${userData.cartId}/reset`, {}, { headers: authHeaders });

            // Reset status kupon
            setSelectedCoupon(null);
            setDiscount(0);
            setIsCouponApplied(false);
            setDropdownOpen(false); // Tutup dropdown setelah memilih kupon

            // Ambil data keranjang yang diperbarui
            fetchCartData(userData.cartId);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            if (!userData) {
                console.error('User data not available');
                return;
            }
            await axios.delete(`http://34.101.88.254/carts/${userData.cartId}/products/${productId}`, { headers: authHeaders });
            const response = await axios.get<Cart>(`http://34.101.88.254/carts/${userData.cartId}`, { headers: authHeaders });
            const totalPrice = response.data.products.reduce((total, product) => total + product.price, 0);
            const updatedCart = { ...response.data, totalPrice };
            setCart(updatedCart);
            updatePriceWithDiscount(updatedCart, selectedCoupon); // Update price with discount
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        }).format(number).replace(/IDR/, 'Rp');
    };

    const formatDiscount = (coupon: Coupon) => {
        if (coupon.jenisKupon.includes('P')) {
            const percentage = (coupon.persentase * 100).toFixed(0);
            return `${percentage}%`;
        } else {
            return formatRupiah(parseFloat(coupon.potonganHarga));
        }
    };

    const handleCouponSelection = async (coupon: Coupon) => {
        try {
            if (!cart) {
                console.error('Cart data not available');
                return;
            }
            console.log('Selected Coupon:', coupon);
            console.log('Cart Total Price:', cart.totalPrice);

            const response = await axios.get(`http://34.87.61.85/gunakan-kupon/${coupon.kode}/${cart.totalPrice}`, { headers: authHeaders });

            console.log('Response from server kupon:', response.data);

            // Ensure potonganHarga is a valid number
            const potonganHarga = parseFloat(response.data);
            if (isNaN(potonganHarga)) {
                throw new Error('Invalid discount value received from server');
            }

            setDiscount(potonganHarga);
            setSelectedCoupon(coupon);
            setIsCouponApplied(true); // Set coupon applied to true
            updatePriceWithDiscount(cart, coupon); // Update price with discount
            setDropdownOpen(false); // Close the dropdown after selecting a coupon
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };

    const handleUnapplyCoupon = () => {
        setSelectedCoupon(null);
        setDiscount(0);
        setIsCouponApplied(false);
    };

    const updatePriceWithDiscount = (cart: Cart | null, coupon: Coupon | null) => {
        if (!cart || !coupon) return;

        const { totalPrice } = cart;
        let newDiscount = 0;

        if (coupon.jenisKupon.includes('P')) {
            newDiscount = totalPrice - (totalPrice * coupon.persentase);
        } else {
            newDiscount = totalPrice - parseFloat(coupon.potonganHarga);
        }

        setDiscount(newDiscount > 0 ? newDiscount : 0);
    };

    return (
        <>
            <Head>
                <title>Shopping Cart</title>
                <meta name="description" content="Your Shopping Cart" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="flex items-center space-x-4">
                        <FaShoppingCart className="text-4xl text-blue-600" />
                        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
                    </div>
                    {loading ? (
                        <p className="text-lg text-gray-700">Loading...</p>
                    ) : (
                        <>
                            {cart === null || !cart.products.length ? (
                                <p className="text-lg text-gray-700">Your cart is empty.</p>
                            ) : (
                                <>
                                    <ul className="divide-y divide-gray-200">
                                        {cart.products.map((product: Product) => (
                                            <li key={product.productId}
                                                className="py-4 mb-4 flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-blue-100 p-2 rounded-full">
                                                        <img src={product.imageUrl} alt={product.productName}
                                                             className="w-10 h-10" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-lg font-semibold text-gray-900">{product.productName}</p>
                                                        <p className="text-gray-500">{formatRupiah(product.price)}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.productId)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <AiFillDelete className="text-2xl" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                                        <div>
                                            <p className="text-2xl font-semibold text-gray-900">Total Price: {formatRupiah(cart.totalPrice)}</p>
                                            {isCouponApplied && ( // Display the discount only if a coupon is applied
                                                <div className="flex items-center space-x-4">
                                                    <p className="text-xl font-semibold text-gray-700">Price With Coupon Applied: {formatRupiah(discount)}</p>
                                                    <button
                                                        onClick={handleUnapplyCoupon}
                                                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                                                    >
                                                        Unapply Coupon
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900">Available Coupons</h2>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                {dropdownOpen ? 'Hide Coupons' : 'Show Coupons'}
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg divide-y divide-gray-200 z-10">
                                    {coupons.length > 0 ? (
                                        coupons.map((coupon) => (
                                            <li key={coupon.id}
                                                className="py-4 px-4 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
                                                onClick={() => handleCouponSelection(coupon)}>
                                                <span>{coupon.nama} - {formatDiscount(coupon)}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="py-4 px-4 text-gray-500">No coupons available</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;