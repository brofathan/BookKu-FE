import React from 'react';
import Link from 'next/link';

export type Book = {
  id: string,
  judul: string,
  penulis: string,
  deskripsi: string,
  foto_cover: string,
}

export default function BookCard(book: Book) {
  return (
    <div className='m-8'>
      <div>
        Image
      </div>
      <div>
        <div className='text-xl'>{book.judul}</div>
        <div className='text-[12px]'>{book.deskripsi}</div>
        <div className='mt-4 text-[15px]'>{book.penulis}</div>
        <Link href={`/booklist/${book.id}`}>
          <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}
