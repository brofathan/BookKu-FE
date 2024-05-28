'use client';

// import Authservice from '../misc/Authservice';
// import '../misc/loading.css';
import React, { useEffect, useState } from 'react';
import UserBookCard, { Book } from '@/components/booklist/UserBookCard';
import { FaFilter } from 'react-icons/fa'; // Mengimpor ikon filter dari react-icons

const getAllBooks = async (keyword = '', filterBy = '', sortBy = '', sortDir = '') => {
  const response = await fetch(`http://34.87.170.153/book/list?keyword=${keyword}&filter-by=${filterBy}&sort-by=${sortBy}&sort-dir=${sortDir}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
};

const fetchBooks = async (keyword: string, filterBy: string, sortBy: string, sortDir: string, setBooks: Function, setLoading: Function, setError: Function) => {
  try {
    const books = await getAllBooks(keyword, filterBy, sortBy, sortDir);
    setBooks(books);
  } catch (error) {
    setError('Failed to fetch books');
  } finally {
    setLoading(false);
  }
};

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false); // State untuk mengatur tampilan filter
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    filterBy: '',
    sortBy: '',
    sortDir: ''
  });

  // Fungsi untuk memuat data buku
  const fetchBooks = async () => {
    setLoading(true); // Set loading true ketika permintaan dimulai
    try {
      // Panggil getAllBooks dengan nilai filter dan pengurutan yang saat ini dipilih
      const booksData = await getAllBooks(
        searchParams.keyword,
        searchParams.filterBy,
        searchParams.sortBy,
        searchParams.sortDir
      );
      setBooks(booksData); // Perbarui state books dengan data yang diambil
      setLoading(false); // Set loading false ketika permintaan selesai
    } catch (error) {
      setError('Failed to fetch books'); // Tangani kesalahan jika terjadi
      setLoading(false); // Pastikan loading diatur ke false ketika ada kesalahan
    }
  };

  // Handle form submit untuk pencarian dan filter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(); // Panggil fetchBooks untuk memperbarui data buku berdasarkan input pencarian dan filter
  };

  // Handle perubahan input pada form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  // Effect untuk memuat data buku ketika nilai sort berubah
  useEffect(() => {
    fetchBooks(); // Panggil fetchBooks setiap kali nilai sort berubah
  }, [searchParams.sortBy, searchParams.sortDir]);

  // Tampilkan loading spinner jika loading true
  if (loading) return <p>Loading...</p>;
  // Tampilkan pesan error jika terjadi kesalahan
  if (error) return <p>{error}</p>;

  // Render komponen Page
  return (
    <div className='flex flex-col p-20'>
      <form onSubmit={handleSubmit} className='mb-4 flex items-center w-full'>
        {/* Input pencarian */}
        <input 
          type='text' 
          name='keyword'
          value={searchParams.keyword} 
          onChange={handleChange} 
          placeholder='Search for books' 
          className='border p-2 rounded-l-md h-10 flex-grow'
        />
        {/* Tombol filter */}
        <button 
          type='button' 
          onClick={() => setShowFilter(!showFilter)} 
          className='p-2 bg-gray-200 border-l h-10 flex items-center justify-center rounded-r-md'
        >
          <FaFilter />
        </button>
        <button type='submit' className='ml-2 p-2 bg-blue-500 text-white rounded h-10'>Search</button>
      </form>

      {/* Menampilkan filter jika showFilter bernilai true */}
      {showFilter && (
        <div className='mb-4'>
          <label className='mr-2'>Filter by:</label>
          <select 
            name='filterBy' 
            value={searchParams.filterBy} 
            onChange={handleChange} 
            className='border p-2 rounded-md'
          >
            <option value=''>None</option>
            <option value='judul'>Judul</option>
            <option value='penulis'>Penulis</option>
          </select>

          <div className='mt-4'>
            <label className='mr-2'>Sort by:</label>
            <select 
              name='sortBy' 
              value={searchParams.sortBy} 
              onChange={handleChange} 
              className='border p-2 rounded-md'
            >
              <option value='tanggal_terbit'>Tanggal Terbit</option>
              <option value='buy_count'>Popularitas</option>
              <option value='harga'>Harga</option>
            </select>
            <select 
              name='sortDir' 
              value={searchParams.sortDir} 
              onChange={handleChange} 
              className='ml-2 border p-2 rounded-md'
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
          </div>
        </div>
      )}

      <div className='flex flex-wrap justify-center'>
        {/* Tampilkan daftar buku */}
        {books.map((book: Book) => (
          <UserBookCard
            key={book.id}
            id={book.id}
            judul={book.judul}
            penulis={book.penulis}
            harga={book.harga}
            foto_cover={book.foto_cover}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
