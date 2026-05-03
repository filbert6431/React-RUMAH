import Inputfield from "./Components/InputField";
import { useState } from "react";

export default function BuatKarakter() {
  // Fixed: Original syntax error - extra '=' in useState declarations caused "Assignment to constant variable" error
  const [nama, setNama] = useState ("");
  const [ras, setRas] = useState ("");
  const [Kelas, setKelas] = useState ("");
  const [kelamin, setKelamin] = useState ("");
  const [password, setpassword] = useState ("");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-lg">
      <div className="bg-white p-6 rounded-xl shadow-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Pembuatan Karakter
        </h2>

       <Inputfield
  label="nama"
  type="text"
  placeholder="Masukkan nama karakter"
  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  required
  onChange={(e) => setNama(e.target.value)}
/>

        {!nama ? ( // if
          <p className="mt-1 text-sm text-red-500 font-medium">
            Nama tidak boleh kosong
          </p>
        ) : 
        /\d/.test(nama) ? ( // else if
          <p className="mt-1 text-sm text-red-500">
            Nama tidak boleh ada angka
          </p>
        ) :  
         nama.length < 6 ? ( // else if
          <p className="mt-1 text-sm text-red-500">
            Nama harus lebih dari 6 karakter
          </p>
        ) : ( //else
          <p className="mt-1 text-sm text-green-500 font-medium">Nama valid</p>
        )}

        <Inputfield
          label="ras"
          type="text"
          placeholder="Masukkan ras karakter Anda"
          className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={(e) => setRas(e.target.value)}
        />

        {!ras ? ( // if
          <p className="mt-1 text-sm text-red-500">Masukkan Ras anda</p>
        ) :
         /\d/.test(ras) ? ( // else if
          <p className="mt-1 text-sm text-red-500">Ras tidak boleh ada angka</p>
        ) :
         ras.length < 5 ? ( // else if
          <p className="mt-1 text-sm text-red-500">
            Ras tidak boleh kurang dari 5 huruf
          </p>
        ) : ( // else
          <p className="mt-1 text-sm text-green-500 font-medium">Ras Valid</p>
        )}

        <Inputfield
          label="password"
          type="password"
          placeholder="Masukkan password karakter Anda"
          className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          onChange={(e) => setpassword(e.target.value)}
        />

        {!password ? ( //if
          <p className="mt-1 text-sm text-red-500">Password harus di isi</p>
        ) : 
        password.length <= 7 ? ( // else if
          <p className="mt-1 text-sm text-red-500">
            Password harus lebih dari 7 huruf
          </p>
        ) 
        : password.length >= 13 ? ( // else if
          <p className="mt-1 text-sm text-red-500">
            Password tidak lebih dari 13 huruf
          </p>
        ) : ( // else
          <p className="mt-1 text-sm text-green-500 font-medium">
            Password valid
          </p>
        )}

        <select
          className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setKelas(e.target.value)}
          required
        >
          <option value="">Pilih Kelas</option>
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
        </select>

       
        {!setKelas ? ( // if
          <p className="mt-1 text-sm text-red-500">Harus memilih kelas</p>
        ) : 
        Kelas == "Warrior" ? ( // else if
          <p className="mt-1 text-sm text-green-500">Anda memilih Warrior</p>
        ) : 
        Kelas == "Mage" ? ( // else if
          <p className="mt-1 text-sm text-green-500">Anda memilih Mage</p>

        ) : ( //else
          <p className="mt-1 text-sm text-red-500">
            Masukkan ulang pilihan anda
          </p>
        )}

        <select
          className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setKelamin(e.target.value)}
          required
        > 
          <option value="">Pilih Jenis Kelamin</option>
          <option value="Laki_laki">Laki - Laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        {!kelamin ? ( //if
          <p className="mt-1 text-sm text-red-500">
            Anda harus memilih jenis kelamin
          </p>
        ) :
         kelamin == "Laki_laki" ? ( // else if
          <p className="mt-1 text-sm text-green-500">Anda adalah laki - laki</p>
        ) :
         kelamin == "Perempuan" ? ( // else if
          <p className="mt-1 text-sm text-green-500">Anda adalah perempuan</p>
        ) : ( // else
          <p className="mt-1 text-sm text-red-500">
            Masukkan ulang kelamin anda
          </p>
        )}

        {nama && !/\d/.test(nama) && nama.length >= 6 &&
         ras && !/\d/.test(ras) && ras.length >= 5 &&
         password && password.length > 7 && password.length < 13 &&
         Kelas && kelamin ? (
         <button className="bg-blue-500 text-white py-2 
                           px-4 rounded-md hover:bg-blue-600
                             focus:outline-none focus:ring-2 focus:ring-blue-400"
                             onClick={() => alert('Karakter berhasil dibuat!')}>
            Buat Karakter
          </button>
        ) : null}
      </div>
    </div>
  );
}
