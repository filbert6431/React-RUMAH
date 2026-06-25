import Container from "../../Layout/Container";
import PageBanner from "../../components/Guest/PageBanner";

const values = [
  {
    title: "Fresh Ingredients",
    description: "We use carefully selected beans and simple quality ingredients.",
  },
  {
    title: "Comfortable Place",
    description: "Our shop is designed for relaxing, studying, and meeting friends.",
  },
  {
    title: "Friendly Service",
    description: "Every customer is welcomed with warm and helpful service.",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-[#F4EFEA] text-[#2D2825]">
      {/* Page Banner */}
      <PageBanner
        title="About Us"
        subtitle="A simple coffee shop built around fresh drinks and good moments."
      />

      {/* Story Section */}
      <section className="py-16">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black text-[#1A1614] md:text-4xl">
                Coffee Made With Care
              </h2>
              <p className="mt-5 leading-8 text-[#2D2825]/75">
                Coffee House is a cozy place to enjoy handcrafted coffee,
                refreshing beverages, and simple snacks. We focus on clean
                flavors, comfortable spaces, and service that makes every visit
                feel easy.
              </p>
              <p className="mt-4 leading-8 text-[#2D2825]/75">
                Whether you need a morning coffee, an afternoon break, or a
                quiet place to work, our menu is made to match every mood.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
                alt="Coffee shop interior"
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="pb-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-black text-[#1A1614]">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-[#2D2825]/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
