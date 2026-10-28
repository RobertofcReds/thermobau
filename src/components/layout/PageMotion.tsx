"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const targets = [
  ".editorial-hero-copy",
  ".editorial-photo-hero",
  ".editorial-heading",
  ".editorial-card",
  ".editorial-gallery article",
  ".editorial-process li",
  ".editorial-facts article",
  ".editorial-work-types > div",
  ".editorial-mini-gallery .editorial-photo",
  ".editorial-service-links",
  ".editorial-split > .editorial-photo",
].join(",");

/** Progressive enhancement: content stays visible until an entry animation
 * begins, and remains visible if JavaScript or IntersectionObserver is absent. */
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main || main.querySelector(".editorial-legal")) return;
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let elements: HTMLElement[] = [];

    function clear() {
      observer?.disconnect();
      elements.forEach((element) => {
        element.removeAttribute("data-page-reveal");
        element.removeAttribute("data-reveal-complete");
        element.style.removeProperty("--reveal-delay");
      });
      elements = [];
    }

    function start() {
      clear();
      if (preference.matches || !main) return;
      elements = Array.from(main.querySelectorAll<HTMLElement>(targets)).filter(
        (element) => !element.closest("form, .editorial-legal"),
      );
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            const siblings = element.parentElement;
            if (
              siblings?.matches(
                ".editorial-cards, .editorial-gallery, .editorial-process ol, .editorial-facts, .editorial-mini-gallery",
              )
            ) {
              const index = Array.from(siblings.children).indexOf(element);
              element.style.setProperty(
                "--reveal-delay",
                `${(index % 3) * 70}ms`,
              );
            }
            element.dataset.pageReveal = element.matches(
              ".editorial-photo-hero",
            )
              ? "image"
              : "rise";
            if (element.matches(":focus-within"))
              element.dataset.revealComplete = "true";
            observer?.unobserve(element);
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
      );
      elements.forEach((element) => observer?.observe(element));
    }

    function revealFocused(event: FocusEvent) {
      const element = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-page-reveal]",
      );
      // A focused card stays settled after blur; its entry must not restart.
      if (element && main?.contains(element))
        element.dataset.revealComplete = "true";
    }

    start();
    main.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", start);
    return () => {
      main.removeEventListener("focusin", revealFocused);
      preference.removeEventListener("change", start);
      clear();
    };
  }, [pathname]);

  return null;
}
