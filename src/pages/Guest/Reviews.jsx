import { useEffect, useMemo, useState } from "react";

import Container from "../../Layout/Container";
import PageBanner from "../../components/Guest/PageBanner";
import RatingStars from "../../components/Guest/RatingStar";
import ReviewForm from "../../components/Guest/Review";
import { reviewsAPI } from "../../Services/Reviews";
import { formatRupiah } from "../../lib/orderUtils";

function safeText(value) {
  return typeof value === "string" ? value : "";
}

export default function Reviews() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const sortedReviews = useMemo(() => {
    return (Array.isArray(reviews) ? reviews : [])
      .slice()
      .sort((a, b) => {
        const ad = new Date(a.tanggal_review || a.created_at || 0);
        const bd = new Date(b.tanggal_review || b.created_at || 0);
        return bd - ad;
      });
  }, [reviews]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await reviewsAPI.fetchReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Gagal memuat ulasan. Silakan coba lagi.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async ({ nama, rating, ulasan }) => {
    setSubmitLoading(true);
    setSubmitSuccess("");
    setSubmitError("");
    try {
      const payload = {
        customer_name: nama,
        star_review: Number(rating),
        review_text: safeText(ulasan),
        tanggal_review: new Date().toISOString(),
      };

      await reviewsAPI.createReview(payload);
      setSubmitSuccess("Terima kasih! Ulasan Anda berhasil dikirim.");

      await load();
    } catch (e) {
      console.error("Review submit error:", e);
      setSubmitError("Review gagal, silahkan coba lagi.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      <PageBanner
        title="Customer Reviews"
        subtitle="Read what customers say and share your own experience."
      />

      <section className="py-16">
        <Container>
          {error && (
            <div className="mb-6 rounded-2xl bg-white/70 border border-white/80 p-4 text-sm text-[#2D2825]/70">
              {error}
            </div>
          )}

          {loading ? (
            <div className="rounded-3xl bg-white/60 border border-white/70 p-8 text-center">
              Loading reviews...
            </div>
          ) : sortedReviews.length === 0 ? (
            <div className="rounded-3xl bg-white/60 border border-white/70 p-8 text-center">
              Belum ada ulasan.
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {sortedReviews.map((review, idx) => {
                const name = review.customer_name || review.nama_customer || review.customer_id || `Reviewer ${idx + 1}`;
                const rating = review.star_review ?? review.rating ?? 0;
                const comment = review.review_text ?? review.comment ?? review.review_text;

                return (
                  <div key={review.review_id ?? review.id ?? idx} className="rounded-3xl bg-white p-6 shadow-md">
                    <RatingStars rating={Number(rating)} setRating={() => {}} />
                    <p className="mt-5 leading-7 text-[#2D2825]/75">"{safeText(comment)}"</p>
                    <h3 className="mt-6 font-black text-[#1A1614]">{safeText(name) || "Anonymous"}</h3>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            {(submitSuccess || submitError) && (
              <div className={submitError ? "mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-600 font-bold" : "mb-5 rounded-2xl bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-600 font-bold"}>
                {submitSuccess || submitError}
              </div>
            )}
            {/* adapt ReviewForm via onSubmit prop */}
            <ReviewForm onSubmit={handleSubmit} submitLoading={submitLoading} />
          </div>
        </Container>
      </section>
    </div>
  );
}

