import Link from "next/link";
import { ChevronRight } from "lucide-react";
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
      <ol>
        <li>
          <Link href="/">Startseite</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <ChevronRight size={14} aria-hidden="true" />
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
