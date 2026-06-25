import { useState } from "react";
import Button from "./Button";
import RatingStars from "./RatingStar";

export default function ReviewForm() {

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">

      <h2 className="text-3xl font-black mb-5">
        Leave a Review
      </h2>

      <RatingStars
        rating={rating}
        setRating={setRating}
      />

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

      <Button className="mt-5">
        Submit Review
      </Button>

    </div>
  );
}
