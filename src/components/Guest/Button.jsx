export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = ""
}) {
  const styles = {
    primary:
      "bg-[#967259] hover:bg-[#7e5e47] text-white",

    secondary:
      "bg-[#F4EFEA] hover:bg-[#e5ddd5] text-[#2D2825]",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-5 py-3
        rounded-xl
        font-bold
        transition-all
        active:scale-95
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}