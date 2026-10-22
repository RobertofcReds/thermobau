import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
