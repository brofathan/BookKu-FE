import BookCard, { Book } from '@/components/dashboard/BookCard';
import axios from 'axios'
import React from 'react'

const getAllBooks = async () => {
  const response = await axios.get("http://34.87.170.153/api/book")

  if(!response.status){
    throw new Error();
  }

  return response.data;
}

export default async function page() {
  const books = await getAllBooks();
  
  return (
    <>
      <div className='flex flex-col'>
        {books.map((book: Book) => (
          <BookCard
            key={book.id}
            id={book.id}
            judul={book.judul} 
            penulis={book.penulis} 
            deskripsi={book.deskripsi} 
            foto_cover={book.foto_cover}
          />
        ))}
      </div>
    </>
  )
}
