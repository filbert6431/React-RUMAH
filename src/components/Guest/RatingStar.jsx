import { FaStar } from "react-icons/fa";

export default function RatingStars({
  rating,
  setRating,
}) {
  return (
    <div className="flex gap-2 text-2xl">

      {[1,2,3,4,5].map((star) => (

        <FaStar
          key={star}
          onClick={() => setRating(star)}
          className={`
            cursor-pointer
            transition-colors

            ${
              star <= rating
                ? "text-yellow-500"
                : "text-gray-300"
            }
          `}
        />

      ))}
    </div>
  );
}