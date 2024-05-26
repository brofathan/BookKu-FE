import React from "react";

export type Book = {
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
  func: () => void;
  func2: (id: string) => void;
};

export default function BookCard(book: Book) {
  const handleDelete = (id: string) => {
    fetch("http://34.87.170.153/book/" + id, {
      method: "DELETE",
    }).then((res) => {
      book.func();
    });
  };

  return (
    <div className="m-8 flex">
      <div className="">
        <img src={book.foto_cover} alt="" />
      </div>
      <div>
        <div className="text-xl">{book.judul}</div>
        <div className="mt-4 text-[15px]">{book.penulis}</div>
        <div className="cursor-pointer" onClick={() => handleDelete(book.id)}>
          Delete Book
        </div>
        <div className="cursor-pointer" onClick={() => book.func2(book.id)}>
          Edit Book
        </div>
      </div>
    </div>
  );
}
