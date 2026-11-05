import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/MagneticButton";

const SHELL =
  "group inline-flex items-center gap-4 rounded-full border py-2 pl-6 pr-2 text-sm transition-colors duration-500";

const VARIANTS = {
  outline: "border-accent/30 bg-background text-foreground hover:border-accent",
  solid: "border-transparent bg-foreground text-background hover:bg-foreground/90",
  accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/90",
};

const BADGES = {
  outline: "bg-accent text-accent-foreground",
  solid: "bg-accent text-accent-foreground",
  accent: "bg-background text-accent",
};

/**
 * The studio's pill button: a label with a circular arrow badge.
 */
export default function PillButton({
  children,
  as = "a",
  variant = "outline",
  className = "",
  badgeClassName = "",
  ...rest
}) {
  const isButton = as === "button";

  return (
    <MagneticButton
      as={as}
      {...(isButton ? { type: "button", ...rest } : rest)}
      className={cn(SHELL, VARIANTS[variant], className)}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45",
          BADGES[variant],
          badgeClassName
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </MagneticButton>
  );
}