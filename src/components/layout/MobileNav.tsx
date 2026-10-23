"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { localizedNavigation, pagePath, type Locale } from "@/i18n/routing";

export function MobileNav({ locale }: { locale: Locale }) {
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
        aria-label={
          locale === "de"
            ? "Menü öffnen"
            : locale === "en"
              ? "Open menu"
              : "Ouvrir le menu"
        }
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={show}
      >
        <Menu size={24} aria-hidden="true" />
        <span>{locale === "de" ? "Menü" : "Menu"}</span>
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-dialog"
        aria-label={
          locale === "de"
            ? "Hauptmenü"
            : locale === "en"
              ? "Main menu"
              : "Menu principal"
        }
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
              aria-label={
                locale === "de"
                  ? "Menü schließen"
                  : locale === "en"
                    ? "Close menu"
                    : "Fermer le menu"
              }
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label={
              locale === "de"
                ? "Mobile Hauptnavigation"
                : locale === "en"
                  ? "Mobile navigation"
                  : "Navigation mobile"
            }
          >
            {localizedNavigation[locale].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  pathname === href ||
                  (href !== pagePath("home", locale) &&
                    pathname.startsWith(`${href}/`))
                    ? "page"
                    : undefined
                }
                onClick={close}
              >
                {label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <Link
            href={pagePath("contact", locale)}
            className="button button-primary"
            onClick={close}
          >
            {locale === "de"
              ? "Projekt anfragen"
              : locale === "en"
                ? "Request a project"
                : "Parler du projet"}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <p className="small-text">
            {locale === "de"
              ? "Renovierung & Innenausbau"
              : locale === "en"
                ? "Renovation & interiors"
                : "Rénovation & aménagement intérieur"}
            <br />
            Ludwigshafen
          </p>
        </div>
      </dialog>
    </div>
  );
}
