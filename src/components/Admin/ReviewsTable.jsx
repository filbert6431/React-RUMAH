import { useState } from "react";
import { Button } from "../ui/button";
import { FaStar } from "react-icons/fa";

export default function ReviewsTable({ filteredReviews }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 25;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = filteredReviews.slice(start, end);

  return (
    <div className="bg-[#2D2825]/60 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1E1A18]/50 text-[#D4B5A0] uppercase text-[10px] font-black tracking-[0.2em]">
            <tr>
              <th className="p-8 text-center">Review ID</th>
              <th className="p-8">Customer</th>
              <th className="p-8 text-center">Rating</th>
              <th className="p-8">Komentar</th>
            </tr>
          </thead>
          <tbody className="text-[#E5D9D0]">
            {currentData.length > 0 ? (
              currentData.map((review) => (
                <tr key={review.review_id} className="border-t border-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group">
                  <td className="p-8 text-center">
                    <span className="bg-[#141110] text-dash-accent border border-dash-accent/20 px-4 py-2 rounded-xl text-xs font-black group-hover:border-dash-accent/60 transition-all">
                      {review.review_id}
                    </span>
                  </td>
                  <td className="p-8">
                    <div>
                      <p className="text-lg font-black text-white group-hover:text-dash-accent transition-colors leading-none">
                        {review.customer_id}
                      </p>
                      <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.15em] mt-1.5">Customer ID</p>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <div className="inline-flex items-center gap-2 justify-center">
                      <span className="text-lg font-black text-white">{review.star_review}</span>
                      <FaStar className="text-dash-accent" />
                    </div>
                  </td>
                  <td className="p-8">
                    <p className="text-sm text-white/80 leading-relaxed">{review.review_text}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-32 text-center text-white/10">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-xl font-black italic tracking-widest uppercase">Ulasan tidak ditemukan</p>
                    <p className="text-sm">Ubah kata kunci atau rating untuk melihat data lagi.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 justify-center items-center">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span>Page {page}</span>
          <Button disabled={end >= filteredReviews.length} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
