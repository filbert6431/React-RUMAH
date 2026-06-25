export default function ProductPreview({ image }) {
  return (
    <div className="overflow-hidden rounded-3xl shadow-md group">

      <img
        src={image}
        alt="Coffee Product"
        className="
          w-full
          h-72
          object-cover
          group-hover:scale-110
          transition-transform
          duration-500
        "
      />

    </div>
  );
}