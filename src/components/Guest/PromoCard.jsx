import Button from "./Button";

export default function PromoCard({
  title,
  description,
  image,
  claimCount,
  onClaim,
}) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">

      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-black text-[#2D2825]">
          {title}
        </h3>

        <p className="text-gray-500 mt-2">
          {description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-sm text-amber-700 font-bold">
            Claimed {claimCount} times
          </span>

          <Button onClick={onClaim}>
            Claim
          </Button>

        </div>

      </div>
    </div>
  );
}
