import React from 'react';
import Link from 'next/link';

export type Book = {
  id: string,
  judul: string,
  penulis: string,
  harga: string,
  foto_cover: string,
}

export default function BookCard(book: Book) {
  return (
    <div className='m-4 p-4 border rounded-lg shadow-lg flex flex-col items-center w-64 h-96'>
      <div className='flex justify-center items-center h-48 w-full'>
        <img src={book.foto_cover} alt={book.judul} className='w-32 h-48 object-cover rounded-lg' />
      </div>
      <div className='text-center mt-4 flex flex-col items-center justify-between h-full'>
        <div>
          <div className='text-xl font-bold'>{book.judul}</div>
          <div className='mt-2 text-sm text-gray-600'>{book.penulis}</div>
          <div className='mt-2 text-lg text-green-600'>{book.harga}</div>
        </div>
        <Link href={`/booklist/${book.id}`}>
          <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
