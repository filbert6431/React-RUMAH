import Container from "../../Layout/Container";
import PageBanner from "../../components/Guest/PageBanner";
import RatingStars from "../../components/Guest/RatingStar";
import ReviewForm from "../../components/Guest/Review";

const reviews = [
  {
    id: 1,
    name: "Alya Putri",
    rating: 5,
    comment: "The coffee is fresh and the place is comfortable for studying.",
  },
  {
    id: 2,
    name: "Raka Pratama",
    rating: 4,
    comment: "Friendly service and many good choices on the menu.",
  },
  {
    id: 3,
    name: "Nadia Zahra",
    rating: 5,
    comment: "The latte is smooth and the promotions are always interesting.",
  },
];

export default function Reviews() {
  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      {/* Page Banner */}
      <PageBanner
        title="Customer Reviews"
        subtitle="Read what customers say and share your own experience."
      />

      {/* Reviews List */}
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-3xl bg-white p-6 shadow-md"
              >
                <RatingStars rating={review.rating} setRating={() => {}} />
                <p className="mt-5 leading-7 text-[#2D2825]/75">
                  "{review.comment}"
                </p>
                <h3 className="mt-6 font-black text-[#1A1614]">
                  {review.name}
                </h3>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Review Form */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ReviewForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
