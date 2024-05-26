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
    <div className="m-8 flex bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-1/3">
        <img
          src={book.foto_cover}
          alt={book.judul}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 w-2/3">
        <div className="text-xl font-semibold text-gray-900">{book.judul}</div>
        <div className="mt-2 text-sm text-gray-600">by {book.penulis}</div>
        <div className="mt-4 text-gray-700">{book.deskripsi}</div>
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <span className="font-semibold">Penerbit:</span> {book.penerbit}
          </p>
          <p>
            <span className="font-semibold">Harga:</span> Rp{book.harga}
          </p>
          <p>
            <span className="font-semibold">Stok:</span> {book.stok}
          </p>
          <p>
            <span className="font-semibold">Tanggal Terbit:</span>{" "}
            {book.tanggal_terbit}
          </p>
          <p>
            <span className="font-semibold">ISBN:</span> {book.isbn}
          </p>
          <p>
            <span className="font-semibold">Jumlah Halaman:</span>{" "}
            {book.jumlah_halaman}
          </p>
          <p>
            <span className="font-semibold">Kategori:</span> {book.kategori}
          </p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => handleDelete(book.id)}
          >
            Delete Book
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => book.func2(book.id)}
          >
            Edit Book
          </button>
        </div>
      </div>
    </div>
  );
}
