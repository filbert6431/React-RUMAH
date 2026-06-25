export default function PageBanner({
  title,
  subtitle
}) {
  return (
    <section className="
      bg-[#1A1614]
      text-white
      py-20
      text-center
    ">
      <h1 className="text-5xl font-black">
        {title}
      </h1>

      <p className="mt-4 text-white/70">
        {subtitle}
      </p>
    </section>
  );
}   