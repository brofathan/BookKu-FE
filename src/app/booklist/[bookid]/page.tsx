'use client'

// import Authservice from 'BookKu-FE/src/app/misc/Authservice';
// import '../misc/loading.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Book = {
  id: string,
  judul: string,
  penulis: string,
  deskripsi: string,
  foto_cover: string,
  penerbit: string,
  harga: number,
  stok: number,
  tanggal_terbit: string,
  isbn: string,
  jumlah_halaman: number,
  kategori: string,
};

const BookDetail = () => {
  const [book, setBook] = useState<Book | null>(null);
  // const [userData, setUserData] = useState<{ cartId: number, historyId: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const authHeaders = {
  //   'Content-Type': 'application/json',
  //   'X-API-KEY': 'KNziwqdninINDidwqdji192j9e1cmkasdnaksdnii932niNINi39rnd',
  //   'Authorization': typeof window !== 'undefined' ? `${localStorage.getItem('accessToken')}` : '',
  // };

  // const fetchUserData = async () => {
  //   try {
  //     console.log('Auth Headers:', authHeaders);
  //     const response = await axios.get('http://34.66.73.124/account/get-account', { headers: authHeaders });
  //     setUserData({ cartId: response.data.cartId, historyId: response.data.historyId });
  //   } 
  //   catch (error) {
  //       console.error('Error fetching user data:', error);
  //   }
  // };

  useEffect(() => {
    // const authorizeUser = async () => {
    //   try {
    //     await Authservice.authorize('user');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchBook = async () => {
      const id = window.location.pathname.split('/').pop(); // Mendapatkan id dari URL
      try {
        const res = await fetch(`http://34.87.170.153/book/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await res.json();
        setBook(data.data);
      } catch (error) {
        setError('Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };
    // fetchUserData();
    // authorizeUser();
    fetchBook();
  }, []);

  const handleAddToCart = async () => {
    // console.log(userData?.cartId);

    if (!book) return;

    const cartEndpoint = `http://34.101.88.254/carts/${userData.cartId}/products`;
    const bookData = {
      tokenBuku: book.id,
      productName: book.judul,
      price: book.harga,
      imageUrl: book.foto_cover,
    };

    try {
      await axios.post(cartEndpoint, bookData);
      alert('Book added to cart successfully!');
    } catch (error) {
      console.error('Error adding book to cart:', error);
      alert('Failed to add book to cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='m-8 p-20'>
      {book && (
        <>
          <h1 className='text-3xl'>{book.judul}</h1>
          <div className='text-lg'>{book.penulis}</div>
          <p className='mt-4'>{book.deskripsi}</p>
          <img src={book.foto_cover} alt={book.judul} />
          <p className='mt-2'>Penerbit: {book.penerbit}</p>
          <p className='mt-2'>Harga: {book.harga}</p>
          <p className='mt-2'>Stok: {book.stok}</p>
          <p className='mt-2'>Tanggal Terbit: {book.tanggal_terbit}</p>
          <p className='mt-2'>ISBN: {book.isbn}</p>
          <p className='mt-2'>Jumlah Halaman: {book.jumlah_halaman}</p>
          <p className='mt-2'>Kategori: {book.kategori}</p>
          <button
            onClick={handleAddToCart}
            className='mt-4 p-2 bg-blue-500 text-white rounded'
          >
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default BookDetail;
