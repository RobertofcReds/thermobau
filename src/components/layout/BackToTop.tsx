"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  de: "Zurück nach oben",
  en: "Back to top",
  fr: "Retour en haut",
};

export function BackToTop({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame: number | null = null;
    function update() {
      frame = null;
      setVisible(window.scrollY > 560);
    }
    function onScroll() {
      if (frame === null) frame = window.requestAnimationFrame(update);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  function goToTop() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "instant" : "smooth",
    });
    // Keep keyboard focus useful when this button disappears at the top.
    document
      .querySelector<HTMLAnchorElement>(".site-header .logo")
      ?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible}
      aria-label={labels[locale]}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={goToTop}
    >
      <ArrowUp size={22} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}
