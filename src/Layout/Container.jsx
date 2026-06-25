export default function Container({ children }) {
  return (
    <div className="
      max-w-7xl
      mx-auto
      px-6
      md:px-10
      lg:px-16
    ">
      {children}
    </div>
  );
}