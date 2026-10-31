"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { pagePath, type Locale } from "@/i18n/routing";
import { searchSite, type SearchEntry } from "@/lib/site-search";
import { useHeaderMenu } from "./SmartHeader";

const copy = {
  de: {
    trigger: "Website durchsuchen",
    short: "Suchen…",
    title: "Was suchen Sie?",
    placeholder: "Leistung, Thema oder Kontakt…",
    hint: "Durchsuchen Sie Leistungen, Informationen und Antworten auf dieser Website.",
    close: "Suche schließen",
    clear: "Suchbegriff löschen",
    suggestions: "Direkt entdecken",
    results: "Suchergebnisse",
    count: (count: number) =>
      `${count} ${count === 1 ? "Ergebnis" : "Ergebnisse"}`,
    empty: "Keine passenden Inhalte gefunden.",
    help: "Versuchen Sie einen anderen Begriff, zum Beispiel Trockenbau, Fliesen oder Kontakt.",
    contact: "Kontakt aufnehmen",
    minimum: "Geben Sie mindestens zwei Zeichen ein.",
    submit: "Suchen",
  },
  en: {
    trigger: "Search the website",
    short: "Search…",
    title: "What are you looking for?",
    placeholder: "Service, topic or contact…",
    hint: "Find services, information and answers across this website.",
    close: "Close search",
    clear: "Clear search",
    suggestions: "Explore the website",
    results: "Search results",
    count: (count: number) => `${count} ${count === 1 ? "result" : "results"}`,
    empty: "No matching content found.",
    help: "Try another term, such as drywall, tiling or contact.",
    contact: "Get in touch",
    minimum: "Enter at least two characters.",
    submit: "Search",
  },
  fr: {
    trigger: "Rechercher dans le site",
    short: "Rechercher…",
    title: "Que recherchez-vous ?",
    placeholder: "Prestation, sujet ou contact…",
    hint: "Retrouvez les prestations, les informations et les réponses du site.",
    close: "Fermer la recherche",
    clear: "Effacer la recherche",
    suggestions: "À découvrir",
    results: "Résultats de recherche",
    count: (count: number) =>
      `${count} ${count === 1 ? "résultat" : "résultats"}`,
    empty: "Aucun contenu correspondant.",
    help: "Essayez un autre terme, par exemple peinture, carrelage ou contact.",
    contact: "Nous contacter",
    minimum: "Saisissez au moins deux caractères.",
    submit: "Rechercher",
  },
};

export function SiteSearch({
  locale,
  entries,
}: {
  locale: Locale;
  entries: SearchEntry[];
}) {
  const t = copy[locale];
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const resultList = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const setHeaderMenuOpen = useHeaderMenu();
  const trimmedQuery = query.trim();
  const results = useMemo(() => searchSite(query, entries), [query, entries]);
  const suggestions = entries.filter((entry) =>
    [
      pagePath("services", locale),
      pagePath("contact", locale),
      pagePath("gallery", locale),
    ].some((href) => href === entry.href),
  );
  const visibleResults = trimmedQuery.length >= 2 ? results : suggestions;

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setHeaderMenuOpen?.(true);
    return () => {
      document.body.style.overflow = previousOverflow;
      setHeaderMenuOpen?.(false);
    };
  }, [open, setHeaderMenuOpen]);

  useEffect(() => {
    if (resultList.current) resultList.current.scrollTop = 0;
  }, [query]);

  function show() {
    dialog.current?.showModal();
    setOpen(true);
    input.current?.focus({ preventScroll: true });
  }

  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <div className="site-search">
      <button
        ref={trigger}
        type="button"
        className="site-search-trigger"
        data-testid="site-search-trigger"
        aria-label={t.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-search-dialog"
        onClick={show}
      >
        <Search size={18} aria-hidden="true" />
        <span>{t.short}</span>
      </button>
      <dialog
        ref={dialog}
        id="site-search-dialog"
        className="site-search-dialog"
        data-testid="site-search-dialog"
        aria-labelledby="site-search-title"
        aria-describedby="site-search-hint"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab" || !event.currentTarget.open) return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button, input, [tabindex]",
            ),
          ).filter(
            (element) =>
              element.tabIndex >= 0 &&
              !element.matches(":disabled") &&
              element.getClientRects().length > 0,
          );
          const first = controls[0];
          const last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="site-search-panel">
          <div className="site-search-heading">
            <div>
              <p className="site-search-eyebrow">Thermobau V&amp;V</p>
              <h2 id="site-search-title">{t.title}</h2>
            </div>
            <button
              type="button"
              className="site-search-close"
              data-testid="site-search-close"
              aria-label={t.close}
              onClick={close}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <p id="site-search-hint" className="site-search-hint">
            {t.hint}
          </p>
          <form
            role="search"
            aria-label={t.trigger}
            className="site-search-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (trimmedQuery.length < 2 || results.length === 0) return;
              router.push(results[0].href);
              close();
            }}
          >
            <label className="sr-only" htmlFor="site-search-query">
              {t.trigger}
            </label>
            <Search size={21} aria-hidden="true" />
            <input
              ref={input}
              id="site-search-query"
              data-testid="site-search-input"
              type="search"
              value={query}
              maxLength={120}
              autoComplete="off"
              enterKeyHint="search"
              placeholder={t.placeholder}
              aria-controls="site-search-results"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  resultList.current
                    ?.querySelector<HTMLAnchorElement>("a")
                    ?.focus();
                }
              }}
            />
            {query && (
              <button
                type="button"
                className="site-search-clear"
                data-testid="site-search-clear"
                aria-label={t.clear}
                onClick={() => {
                  setQuery("");
                  input.current?.focus();
                }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
            <button
              type="submit"
              className="site-search-submit"
              aria-label={t.submit}
              disabled={trimmedQuery.length < 2 || results.length === 0}
            >
              <ArrowUpRight size={21} aria-hidden="true" />
            </button>
          </form>
          <div
            className="site-search-summary"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {trimmedQuery.length === 0
              ? t.suggestions
              : trimmedQuery.length < 2
                ? t.minimum
                : `${t.results} · ${t.count(results.length)}`}
          </div>
          <ul
            ref={resultList}
            className="site-search-results"
            id="site-search-results"
          >
            {visibleResults.map((entry, index) => (
              <li key={entry.id}>
                <Link
                  href={entry.href}
                  prefetch={false}
                  data-testid="site-search-result"
                  onClick={close}
                  onKeyDown={(event) => {
                    const links =
                      resultList.current?.querySelectorAll<HTMLAnchorElement>(
                        "a",
                      );
                    if (!links) return;
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      links[(index + 1) % links.length]?.focus();
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      if (index === 0) input.current?.focus();
                      else links[index - 1]?.focus();
                    }
                  }}
                >
                  <span className="site-search-result-copy">
                    <span className="site-search-category">
                      {entry.category}
                    </span>
                    <strong>{entry.title}</strong>
                    <span className="site-search-description">
                      {entry.description}
                    </span>
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          {trimmedQuery.length >= 2 && results.length === 0 && (
            <div className="site-search-empty">
              <Search size={28} aria-hidden="true" />
              <h3>{t.empty}</h3>
              <p>{t.help}</p>
              <Link href={pagePath("contact", locale)} onClick={close}>
                {t.contact} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
