"use client";

import BookCard, { Book } from "@/components/dashboard/BookCard";
import UserCard, { User } from "@/components/dashboard/UserCard";
import { users } from "@/utils/dummyUser";
import { List } from "postcss/lib/list";
import React, { useEffect, useState } from "react";

const getAllBooks = async () => {
  const response = await fetch("http://34.87.170.153/book", {
    cache: "no-store",
  });

  if (!response.status) {
    throw new Error();
  }

  return response.json();
};

export default function page() {
  // const users = await getAllUsers();

  const [isModal, setIsModal] = useState(false);
  const [bookSection, setBookSection] = useState(true);
  const [bookData, setBookData] = useState([]);

  const [id, setId] = useState("");
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [tanggal, setTanggal] = useState("");
  const [isbn, setIsbn] = useState("");
  const [halaman, setHalaman] = useState(0);
  const [foto, setFoto] = useState("");
  const [kategori, setKategori] = useState("");

  const fetchData = async () => {
    const response = await fetch("http://34.87.170.153/book");
    const data = await response.json();

    setBookData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    fetchData();
  };

  const handleModal = async (id: string) => {
    getBook(id);
    setIsModal(true);
  };

  const getBook = async (id: string) => {
    const response = await fetch("http://34.87.170.153/book/" + id);
    const data = await response.json();

    console.log(data.data);

    setId(data.data.id);
    setJudul(data.data.judul);
    setPenulis(data.data.penulis);
    setPenerbit(data.data.penerbit);
    setDeskripsi(data.data.deskripsi);
    setHarga(data.data.harga);
    setStok(data.data.stok);
    setTanggal(data.data.tanggal_terbit);
    setIsbn(data.data.isbn);
    setHalaman(data.data.jumlah_halaman);
    setFoto(data.data.foto_cover);
    setKategori(data.data.kategori);
  };

  async function getBookss(id: string) {
    const response = await fetch(
      "https://crud-deploy-seven.vercel.app/api/post?id=" + id
    );
    const data = await response.json();

    // setPost(data);
    // setTitle(data.title);
    // setAmount(data.amount);
    // setDesc(data.description);
  }

  const handleSubmit = (e: any, id: string) => {
    e.preventDefault();
    setIsModal(false);

    console.log(id);

    fetch("http://34.87.170.153/book/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        penerbit: e.target.penerbit.value,
        deskripsi: e.target.deskripsi.value,
        harga: e.target.harga.value,
        stok: e.target.stok.value,
        tanggal_terbit: e.target.tanggal_terbit.value,
        isbn: e.target.isbn.value,
        jumlah_halaman: e.target.jumlah_halaman.value,
        foto_cover: e.target.foto_cover.value,
        kategori: e.target.kategori.value,
      }),
    });
  };

  // const bookList: Array<Book> = bookData.data;

  return (
    <>
      {/* MODAL */}
      <div className={`${!isModal ? "hidden" : ""}`}>
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsModal(false);
          }}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Edit Book</h2>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => {
                  setIsModal(false);
                }}
              >
                &times;
              </button>
            </div>
            <div>
              <form
                onSubmit={(e) => handleSubmit(e, id)}
                className="max-w-md mx-auto mt-4"
              >
                <div>
                  <div className="block text-gray-700 font-bold">
                    Judul Buku:{" "}
                  </div>
                  <div className="mb-2">{judul}</div>
                  <div className="block text-gray-700 font-bold">
                    Penulis Buku:{" "}
                  </div>
                  <div className="mb-2">{penulis}</div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="penerbit"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Penerbit Buku
                  </label>
                  <input
                    type="text"
                    id="penerbit"
                    name="penerbit"
                    value={penerbit}
                    onChange={(e) => {
                      setPenerbit(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="deskripsi"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Deskripsi Buku
                  </label>
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={deskripsi}
                    onChange={(e) => {
                      setDeskripsi(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="harga"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Harga Buku
                  </label>
                  <input
                    type="text"
                    id="harga"
                    name="harga"
                    value={harga}
                    onChange={(e) => {
                      setHarga(Number(e.target.value));
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stok"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Stok Buku
                  </label>
                  <input
                    type="text"
                    id="stok"
                    name="stok"
                    value={stok}
                    onChange={(e) => {
                      setStok(Number(e.target.value));
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tanggal"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Tanggal Terbit
                  </label>
                  <input
                    type="text"
                    id="tanggal_terbit"
                    name="tanggal_terbit"
                    value={tanggal}
                    onChange={(e) => {
                      setTanggal(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="isbn"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    ISBN
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={isbn}
                    onChange={(e) => {
                      setIsbn(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="halaman"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Jumlah Halaman
                  </label>
                  <input
                    type="text"
                    id="jumlah_halaman"
                    name="jumlah_halaman"
                    value={halaman}
                    onChange={(e) => {
                      setHalaman(Number(e.target.value));
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="foto"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Link Foto Cover
                  </label>
                  <input
                    type="text"
                    id="foto_cover"
                    name="foto_cover"
                    value={foto}
                    onChange={(e) => {
                      setFoto(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="kategori"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Kategori Buku
                  </label>
                  <input
                    type="text"
                    id="kategori"
                    name="kategori"
                    value={kategori}
                    onChange={(e) => {
                      setKategori(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}

      <div className="text-[40px] font-bold">Dashboard</div>
      <div className="bg-slate-300 m-5 flex font-sans">
        <div>
          <div>Books</div>
          <div>Users</div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            {bookData.map((book: Book) => (
              <BookCard
                key={book.id}
                id={book.id}
                judul={book.judul}
                penulis={book.penulis}
                deskripsi={book.deskripsi}
                foto_cover={book.foto_cover}
                penerbit={""}
                harga={0}
                stok={0}
                tanggal_terbit={""}
                isbn={""}
                jumlah_halaman={0}
                kategori={""}
                func={refresh}
                func2={handleModal}
              />
            ))}
          </div>
          <div>
            {users.map((user: User) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                name={user.name}
                password={""}
                role={""}
                email={""}
                phone={""}
                cartId={""}
                historyId={""}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
