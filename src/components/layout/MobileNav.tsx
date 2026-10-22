"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (query.matches) {
        dialog.current?.close();
        setOpen(false);
      }
    };
    query.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = before;
      query.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <div className="mobile-navigation">
      <button
        ref={trigger}
        className="menu-trigger"
        aria-label="Menü öffnen"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={show}
      >
        <Menu size={24} aria-hidden="true" />
        <span>Menü</span>
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-dialog"
        aria-label="Hauptmenü"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        <div className="mobile-panel">
          <div className="mobile-panel-heading">
            <span>Navigation</span>
            <button
              onClick={close}
              className="menu-trigger"
              aria-label="Menü schließen"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile Hauptnavigation">
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
                onClick={close}
              >
                {item.label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link
            href="/kontakt"
            className="button button-primary"
            onClick={close}
          >
            Angebot anfragen
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <p className="small-text">
            Renovierung & Innenausbau
            <br />
            Ludwigshafen
          </p>
        </div>
      </dialog>
    </div>
  );
}
