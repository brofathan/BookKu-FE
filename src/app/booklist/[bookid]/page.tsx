'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Book = {
    id: string;
    judul: string;
    penulis: string;
    deskripsi: string;
    foto_cover: string;
    penerbit: string;
    harga: number;
    stok: number;
    tanggal_terbit: string;
    isbn: string;
    jumlah_halaman: number;
    kategori: string;
};

const BookDetail = () => {
    const [book, setBook] = useState<Book | null>(null);
    const [userData, setUserData] = useState<{ cartId: number } | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const authHeaders = {
        'Content-Type': 'application/json',
        'X-API-KEY': 'KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd',
        'Authorization': typeof window !== 'undefined' ? `${localStorage.getItem('accessToken')}` : '',
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://34.66.73.124/account/get-account', { headers: authHeaders });
            setUserData({ cartId: response.data.cartId });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchBook = async (id: string) => {
        try {
            const res = await fetch(`http://34.87.170.153/book/${id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch book');
            }
            const data = await res.json();
            setBook(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addToCart = async () => {
        if (!book || !userData) return;

        const cartItem = {
            tokenBuku: book.id,
            productName: book.judul,
            price: book.harga,
            imageUrl: book.foto_cover,
        };

        setIsAddingToCart(true);

        try {
            await axios.post(`http://34.101.88.254/carts/${userData.cartId}/products`, cartItem, { headers: authHeaders });
            alert('Book added to cart successfully');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            alert('Failed to add book to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const id = window.location.pathname.split('/').pop(); // Mendapatkan id dari URL
        if (id) {
            fetchBook(id);
        }
    }, []);

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="m-8">
            <h1 className="text-3xl">{book.judul}</h1>
            <div className="text-lg">{book.penulis}</div>
            <p className="mt-4">{book.deskripsi}</p>
            <img src={book.foto_cover} alt={book.judul} />
            <p className="mt-2">Penerbit: {book.penerbit}</p>
            <p className="mt-2">Harga: {book.harga}</p>
            <p className="mt-2">Stok: {book.stok}</p>
            <p className="mt-2">Tanggal Terbit: {book.tanggal_terbit}</p>
            <p className="mt-2">ISBN: {book.isbn}</p>
            <p className="mt-2">Jumlah Halaman: {book.jumlah_halaman}</p>
            <p className="mt-2">Kategori: {book.kategori}</p>
            <button
                onClick={addToCart}
                className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isAddingToCart}
            >
                {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default BookDetail;