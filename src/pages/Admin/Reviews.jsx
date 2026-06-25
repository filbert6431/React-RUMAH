import reviews from "../../Data/Reviews.json";
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";
import { useState } from "react";
import ReviewsTable from "../../components/Admin/ReviewsTable";

export default function Reviews() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedRating: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const _searchTerm = dataForm.searchTerm.toLowerCase();

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      String(review.review_id || "").toLowerCase().includes(_searchTerm) ||
      review.customer_id.toLowerCase().includes(_searchTerm) ||
      review.review_text.toLowerCase().includes(_searchTerm);

    const matchesRating = dataForm.selectedRating
      ? review.star_review.toString() === dataForm.selectedRating
      : true;

    return matchesSearch && matchesRating;
  });

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-dash-accent/10 rounded-lg">
              <FaStar className="text-dash-accent" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Ulasan Pelanggan</h1>
          </div>
          <p className="text-white/40 text-sm font-medium">Tinjau feedback pelanggan untuk meningkatkan pengalaman layanan.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-5 py-3.5 focus-within:ring-2 focus-within:ring-dash-accent/50 transition-all shadow-2xl">
            <FaSearch className="text-white/20 mr-3" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari review ID, customer, atau teks..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/20 w-48 md:w-64"
              value={dataForm.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <select
              name="selectedRating"
              value={dataForm.selectedRating}
              onChange={handleChange}
              className="appearance-none bg-black/40 border border-white/5 text-white/70 rounded-2xl py-3 pl-6 pr-12 text-sm font-bold outline-none focus:ring-2 focus:ring-dash-accent/50 transition-all cursor-pointer shadow-2xl"
            >
              <option value="">Semua Rating</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating} className="bg-[#2D2825]">
                  {rating} Bintang
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
              <FaFilter size={12} />
            </div>
          </div>
        </div>
      </div>

      <ReviewsTable filteredReviews={filteredReviews} />

      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[#8E837C] text-xs font-bold uppercase tracking-[0.2em]">
          Showing <span className="text-white">{filteredReviews.length}</span> of {reviews.length} Total Reviews
        </p>
        <div className="flex gap-2">
          <div className={`w-2 h-2 rounded-full ${filteredReviews.length > 0 ? 'bg-dash-accent animate-pulse' : 'bg-white/10'}`}></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}
