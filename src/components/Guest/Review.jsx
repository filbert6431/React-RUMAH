import { useState } from "react";
import Button from "./Button";
import RatingStars from "./RatingStar";

export default function ReviewForm({ onSubmit, submitLoading = false }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (!onSubmit) return;
    onSubmit({ nama: name, rating, ulasan: review });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <h2 className="text-3xl font-black mb-5">Leave a Review</h2>

      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          className="w-full border rounded-2xl px-4 py-3 outline-none"
        />
      </div>

      <RatingStars rating={rating} setRating={setRating} />

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="
          mt-5
          w-full
          h-40
          border
          rounded-2xl
          p-4
          resize-none
        "
      />

      <Button
        className="mt-5"
        onClick={handleSubmit}
        disabled={submitLoading}
      >
        {submitLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}

