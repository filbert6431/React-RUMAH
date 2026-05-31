import { useState } from "react";
import { Button } from "../components/ui/button";

export default function CustomerTable({ customers }) {
  // pagination
  const [page, setPage] = useState(1)

  const itemsPerPage = 25

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const currentData = customers.slice(start, end)

  return (
    <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
            <tr>
              <th className="p-8">ID</th>
              <th className="p-8">Nama</th>
              <th className="p-8">Username</th>
              <th className="p-8">Email</th>
              <th className="p-8">Nomor HP</th>
              <th className="p-8">Jenis Kelamin</th>
            </tr>
          </thead>

          <tbody className="text-[#E5D9D0]">
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr key={item.ID_Customer} className="border-t border-white/2 hover:bg-white/2 transition-all group">
                  <td className="p-8 font-black text-white">{item.ID_Customer}</td>
                  <td className="p-8">{item.Nama_Lengkap}</td>
                  <td className="p-8">{item.Username}</td>
                  <td className="p-8">{item.Email}</td>
                  <td className="p-8">{item.Nomor_HP}</td>
                  <td className="p-8">{item.Jenis_Kelamin}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-20 text-center text-white/30">
                  Data customer tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
                        <div className="flex gap-2 mt-4 justify-center items-center">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <span>Page {page}</span>

          <Button
            disabled={end >= customers.length}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
          </div>
      </div>
    </div>
  );
}