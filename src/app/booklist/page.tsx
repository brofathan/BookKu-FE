'use client';

import React, { useEffect, useState } from 'react';
import UserBookCard, { Book } from '@/components/booklist/UserBookCard';

const getAllBooks = async () => {
  const response = await fetch('http://34.87.170.153/book', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data; // Pastikan mengembalikan data yang benar
};

const Page = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBooks();
        setBooks(books.data); // Perhatikan bahwa data sebenarnya ada di dalam objek data
      } catch (error) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-col'>
      {books.map((book: Book) => (
        <UserBookCard
          key={book.id}
          id={book.id}
          judul={book.judul}
          penulis={book.penulis}
          deskripsi={book.deskripsi}
          foto_cover={book.foto_cover}
        />
      ))}
    </div>
  );
};

export default Page;
