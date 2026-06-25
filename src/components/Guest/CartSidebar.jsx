export default function CartSidebar({
  cart,
  total,
}) {
  return (
    <aside
      className="
        fixed
        right-0
        top-0
        h-screen
        w-96
        bg-white
        shadow-2xl
        p-6
      "
    >

      <h2 className="text-3xl font-black">
        My Cart
      </h2>

      <div className="mt-6 space-y-4">

        {cart.map((item) => (

          <div
            key={item.id}
            className="
              flex
              justify-between
              border-b
              pb-3
            "
          >
            <span>{item.name}</span>

            <span>x{item.qty}</span>
          </div>

        ))}

      </div>

      <div className="mt-8 font-black text-xl">
        Total : Rp {total}
      </div>

    </aside>
  );
}