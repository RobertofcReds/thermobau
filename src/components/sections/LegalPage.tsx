import { Container } from "@/components/ui/Container";
import { getLegal } from "@/i18n/legal";
import type { Locale } from "@/i18n/routing";
export function LegalPage({
  locale,
  page,
}: {
  locale: Locale;
  page: "legal" | "privacy" | "terms";
}) {
  const t = getLegal(locale, page);
  return (
    <>
      <section className="editorial-hero editorial-hero-text">
        <Container>
          <p className="eyebrow">Thermobau V&V</p>
          <h1>
            {locale === "de" && page === "privacy"
              ? "Datenschutz\u00aderklärung"
              : t.title}
          </h1>
          <p className="editorial-lead">{t.description}</p>
        </Container>
      </section>
      <section className="section">
        <Container>
          <p className="editorial-notice">{t.warning}</p>
          <div className="editorial-legal">
            <nav
              aria-label={
                locale === "de"
                  ? "Inhaltsverzeichnis"
                  : locale === "en"
                    ? "On this page"
                    : "Sur cette page"
              }
            >
              {t.sections.map((s, i) => (
                <a key={s.title} href={`#legal-${i}`}>
                  {s.title}
                </a>
              ))}
            </nav>
            <div>
              {t.sections.map((s, i) => (
                <section id={`legal-${i}`} key={s.title}>
                  <h2>{s.title}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </section>
              ))}
              <section>
                <h2>
                  {locale === "de"
                    ? "Quellen & weitere Informationen"
                    : locale === "en"
                      ? "Sources & further information"
                      : "Sources et informations complémentaires"}
                </h2>
                <ul className="editorial-legal-sources">
                  <li>
                    <a href="https://www.gesetze-im-internet.de/ddg/__5.html">
                      § 5 DDG
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gesetze-im-internet.de/ttdsg/__25.html">
                      § 25 TDDDG
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://eur-lex.europa.eu/legal-content/${locale.toUpperCase()}/TXT/?uri=CELEX:32016R0679`}
                    >
                      {locale === "de"
                        ? "DSGVO"
                        : locale === "en"
                          ? "GDPR"
                          : "RGPD"}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gesetze-im-internet.de/bfsg/">BFSG</a>
                  </li>
                  <li>
                    <a href="https://www.datenschutz.rlp.de/">
                      LfDI Rheinland-Pfalz
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://policies.google.com/privacy?hl=${locale}`}
                    >
                      Google —{" "}
                      {locale === "de"
                        ? "Datenschutz"
                        : locale === "en"
                          ? "Privacy"
                          : "Confidentialité"}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pexels.com/license/">
                      Pexels —{" "}
                      {locale === "de"
                        ? "Lizenz"
                        : locale === "en"
                          ? "Licence"
                          : "Licence"}
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
