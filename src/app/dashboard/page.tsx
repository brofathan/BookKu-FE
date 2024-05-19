'use client'
import BookCard, { Book } from '@/components/dashboard/BookCard';
import UserCard, { User } from '@/components/dashboard/UserCard';
import axios from 'axios'
import React, { useEffect } from 'react'

const getAllBooks = async () => {
  const response = await axios.get("http://34.87.170.153/api/book")

  if(!response.status){
    throw new Error();
  }

  return response.data;
}

const getAllUsers = async () => {
  const response = await axios.get("http://34.66.73.124/api/user")

  if(!response.status){
    throw new Error();
  }

  return response.data;
}

export default async function page() {
  const books = await getAllBooks();
  const users = await getAllUsers();
  
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
      <div className='flex flex-col'>
        {users.map((user: User) => (
          <UserCard
            key={user.id}
            id={user.id}
            nama={user.nama}
            foto={user.foto}
          />
        ))}
      </div>
    </>
  )
}
