import React from 'react'

export type Book = {
  id: string,
  judul: string,
  penulis: string,
  // penerbit: string,
  deskripsi: string,
  // harga: number,
  // stok: number,
  // tanggal_terbit: string,
  // isbn: string,
  // jumlah_halaman: number,
  foto_cover: string,
  // kategori: string
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
      </div>
    </div>
  )
}
