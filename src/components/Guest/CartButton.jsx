import Button from "../common/Button";

export default function MenuCard({
  item,
  onAddToCart,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
      "
    >

      <img
        src={item.image}
        alt={item.name}
        className="h-72 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="font-black text-xl">
          {item.name}
        </h3>

        <p className="text-gray-500 mt-2">
          {item.description}
        </p>

        <div
          className="
            flex
            justify-between
            items-center
            mt-5
          "
        >

          <span className="font-black text-amber-700">
            Rp {item.price}
          </span>

          <Button
            onClick={() => onAddToCart(item)}
          >
            +
          </Button>

        </div>

      </div>

    </div>
  );
}