import Container from "../../Layout/Container";
import MenuCard from "../../components/Guest/MenuCard";
import PageBanner from "../../components/Guest/PageBanner";

const menuItems = [
  {
    id: 1,
    name: "Caramel Macchiato",
    description: "Espresso, steamed milk, vanilla, and caramel drizzle.",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    oldPrice: "Rp 38.000",
    price: "Rp 32.000",
  },
  {
    id: 2,
    name: "Classic Cappuccino",
    description: "Rich espresso topped with smooth milk foam.",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80",
    oldPrice: "Rp 35.000",
    price: "Rp 30.000",
  },
  {
    id: 3,
    name: "Iced Americano",
    description: "Bold espresso served chilled over fresh ice.",
    img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80",
    oldPrice: "Rp 30.000",
    price: "Rp 25.000",
  },
  {
    id: 4,
    name: "Vanilla Latte",
    description: "Smooth espresso with milk and a soft vanilla finish.",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    oldPrice: "Rp 40.000",
    price: "Rp 34.000",
  },
  {
    id: 5,
    name: "Mocha Coffee",
    description: "Chocolate, espresso, and creamy steamed milk.",
    img: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=900&q=80",
    oldPrice: "Rp 42.000",
    price: "Rp 36.000",
  },
  {
    id: 6,
    name: "Cold Brew",
    description: "Slow-brewed coffee with a clean and refreshing taste.",
    img: "https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=900&q=80",
    oldPrice: "Rp 36.000",
    price: "Rp 31.000",
  },
];

export default function Menu() {
  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      {/* Page Banner */}
      <PageBanner
        title="Our Menu"
        subtitle="Choose your favorite handcrafted coffee."
      />

      {/* Menu Grid */}
      <section className="py-16">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#1A1614] md:text-4xl">
              Coffee Menu
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#2D2825]/70">
              Simple drinks made with quality beans and fresh ingredients.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
