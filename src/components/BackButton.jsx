import { Link } from "react-router-dom";

export default function BackButton({ onClick, to, label = "Kembali" }) {
  const className =
    "inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-dash-accent hover:text-black transition-all";

  if (to) {
    return (
      <Link to={to} className={className}>
        <span aria-hidden="true">&larr;</span>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span aria-hidden="true">&larr;</span>
      {label}
    </button>
  );
}
