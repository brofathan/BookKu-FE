'use client'

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

  useEffect(() => {
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
        console.error(error);
      }
    };

    fetchBook();
  }, []);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className='m-8'>
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
    </div>
  );
};

export default BookDetail;
