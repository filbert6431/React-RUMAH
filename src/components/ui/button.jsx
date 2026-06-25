import { Slot } from "radix-ui";

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  // Minimal wrapper to satisfy fast-refresh rule: file exports only components.
  // Styling can be applied via className from callers.
  return <Comp className={className} data-variant={variant} data-size={size} {...props} />;
}

