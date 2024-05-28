"use client";

import BookCard, { Book } from "@/components/dashboard/BookCard";
import UserCard, { User } from "@/components/dashboard/UserCard";
import { users } from "@/utils/dummyUser";
import { List } from "postcss/lib/list";
import React, { useEffect, useState } from "react";
import Authservice from "../misc/Authservice";
import { useRouter } from "next/navigation";

const getAllBooks = async () => {
  const response = await fetch("http://34.87.170.153/book", {
    cache: "no-store",
  });

  if (!response.status) {
    throw new Error();
  }

  return response.json();
};

export default function Dashboard() {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [bookSection, setBookSection] = useState(true);
  const [bookData, setBookData] = useState([]);
  const [userData, setUserData] = useState([]);

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

  // AUTHORIZATION //
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchBookData();
  //   fetchAccountData();
  // }, []);

  const fetchBookData = async () => {
    const response = await fetch("http://34.87.170.153/book");
    const data = await response.json();

    setBookData(data.data);
  };

  const fetchAccountData = async () => {
    const response = await fetch("http://34.66.73.124/account/all");
    const data = await response.json();

    setUserData(data);
  };

  useEffect(() => {
    const authorizeUser = async () => {
      try {
        await Authservice.authorize("admin");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
    fetchAccountData();

    authorizeUser();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  // AUTHORIZATION //

  const refresh = () => {
    fetchBookData();
    fetchAccountData();
  };

  // useEffect(() => {
  //   fetchBookData();
  //   fetchAccountData();
  // }, []);

  const handleModal = (id: string) => {
    getBook(id);
    setIsModal(true);
  };

  const handleModalCreate = async () => {
    setIsCreate(true);
  };

  const getBook = async (id: string) => {
    const response = await fetch("http://34.87.170.153/book/" + id);
    const data = await response.json();

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

  const handleSubmit = (e: any, id: string) => {
    e.preventDefault();
    setIsModal(false);

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

    refresh();
    router.push("/dashboard");
  };

  const handleSubmitCreate = (e: any) => {
    e.preventDefault();
    setIsCreate(false);

    fetch("http://34.87.170.153/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        judul: e.target.judul.value,
        penulis: e.target.penulis.value,
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

    refresh();
    router.push("/dashboard");
  };

  // const bookList: Array<Book> = bookData.data;

  return (
    <>
      {/* MODAL UPDATE */}
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
                  onClick={() => router.push("/dashboard")}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL UPDATE*/}

      {/* MODAL CREATE*/}
      <div className={`${!isCreate ? "hidden" : ""}`}>
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setIsCreate(false);
          }}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-full overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold">Add Book</h2>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => {
                  setIsCreate(false);
                }}
              >
                &times;
              </button>
            </div>
            <div>
              <form
                onSubmit={(e) => handleSubmitCreate(e)}
                className="max-w-md mx-auto mt-4"
              >
                <div className="mb-4">
                  <label
                    htmlFor="judul"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Judul Buku
                  </label>
                  <input
                    type="text"
                    id="judul"
                    name="judul"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="penulis"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Penulis Buku
                  </label>
                  <input
                    type="text"
                    id="penulis"
                    name="penulis"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
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
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => router.push("/dashboard")}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL CREATE*/}

      <div className="p-8">
        <div className="text-4xl font-bold mb-8">Dashboard</div>
        <div className="bg-slate-300 p-5 rounded-lg shadow-md font-sans">
          <div className="flex justify-between mb-8">
            <div className="text-2xl font-semibold">Books</div>
            <div
              className="bg-white cursor-pointer px-5 py-2 rounded-lg"
              onClick={() => handleModalCreate()}
            >
              Add Book
            </div>
            <div className="text-2xl font-semibold mr-[400px]">Users</div>
          </div>
          <div className="flex space-x-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-8">
                {bookData.map((book: Book) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    judul={book.judul}
                    penulis={book.penulis}
                    deskripsi={book.deskripsi}
                    foto_cover={book.foto_cover}
                    penerbit={book.penerbit}
                    harga={book.harga}
                    stok={book.stok}
                    tanggal_terbit={book.tanggal_terbit}
                    isbn={book.isbn}
                    jumlah_halaman={book.jumlah_halaman}
                    kategori={book.kategori}
                    func={refresh}
                    func2={handleModal}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-8">
                {userData.map((user: User) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    name={user.name}
                    password={user.password}
                    role={user.role}
                    email={user.email}
                    phone={user.phone}
                    cartId={user.cartId}
                    historyId={user.historyId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
