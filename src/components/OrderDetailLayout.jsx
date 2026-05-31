export default function OrderDetailLayout({ children, left, right }) {
  if (children) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {children}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">{left}</div>
      <div>{right}</div>
    </div>
  );
}
