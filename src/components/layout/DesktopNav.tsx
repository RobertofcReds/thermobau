"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="desktop-navigation" aria-label="Hauptnavigation">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`))
              ? "page"
              : undefined
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
