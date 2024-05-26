"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  judul: string;
  penulis: string;
  penerbit: string;
  deskripsi: string;
  harga: number;
  stok: number;
  tanggal_terbit: string;
  isbn: string;
  jumlah_halaman: number;
  foto_cover: string;
  kategori: string;
  buy_count: number;
}

const BookList: React.FC = () => {
  const user = "John";
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get<{ data: Book[] }>('http://34.87.170.153/book');
        setBooks(response.data.data.slice(0, 10)); // Get only the first 10 books
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error); // Print the error to the console
        setError('Error fetching books');
        setLoading(false);
      }
    }
  
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="p-20 text-left">
  <div className="flex items-center justify-end w-full mb-4">
    <h1 className="text-3xl font-bold ml-auto">Selamat Datang</h1>
  </div>
        <div className="flex items-center justify-end w-full mb-4">
          <div className="bg-blue-900 text-white rounded-full px-16 py-4 mr-auto text-xl font-bold">
            10 Koleksi Teratas
          </div>
          <h1 className="text-8xl font-black" style={{ color: '#000e8b' }}>{user}</h1>
        </div>
        <div className="flex max-w-full overflow-auto" style={{ touchAction: 'pan-y' }}>
          {books.map((book) => (
            
            <div key={book.id} className="shadow bg-white rounded-lg mx-4" style={{ width: 'calc(100% - 1rem)' }}>
            <a href ="">
              <img
                src={book.foto_cover}
                alt={book.judul}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{book.judul}</h2>
                <p className="text-gray-700 mb-2">Penulis: {book.penulis}</p>
                <p className="text-gray-700 mb-2">Harga: Rp{book.harga}</p>       
                <p className="text-gray-700 mb-2">Kategori: {book.kategori}</p>
              </div>
              </a>
            </div>
            
          ))}
        </div>
        <button className="bg-blue-900 w-full text-white rounded-full px-8 py-4 mt-8 shadow font-bold">
          Lihat Semua Buku
        </button>
      </div>
      <div className="mt-12 bg-blue-900 text-white p-20 ">
        <h2 className="text-2xl font-bold mb-4">Tentang Kami</h2>
        <p>
          BookKu adalah toko buku terkemuka di Indonesia, menyediakan berbagai koleksi buku
          terbaru dan terbaik untuk para pecinta literatur. Dengan layanan yang ramah dan
          profesional, kami berkomitmen untuk memenuhi kebutuhan bacaan Anda dengan memberikan
          pengalaman berbelanja yang menyenangkan dan memuaskan.
        </p>
      </div>
      <div className="mt-12 text-black p-20">
          <h2 className="text-2xl font-bold mb-4">Kontak Kami</h2>
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6c0-1.1.9-2 2-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3v2a2 2 0 002 2h2M10 17L3 10M21 10l-7 7"></path>
            </svg>
            <span>bookkustore@maeel.com</span>
          </div>
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6c0-1.1.9-2 2-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-6 0l3-3m0 0l3 3m-3-3v6"></path>
            </svg>
            <p>123 Jalan Buku, Kota Baca, Indonesia</p>
          </div>
        </div>
    </div>
  );
}

export default BookList;

