import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactDetails } from "@/components/layout/ContactDetails";
import { ContactFormWithQuery } from "@/components/forms/ContactFormWithQuery";
import { Location } from "./Location";
import { getContent } from "@/i18n/content";
import { getServices, type LocalizedService } from "@/i18n/services";
import {
  pagePath,
  servicePath,
  type Locale,
  type PageKey,
} from "@/i18n/routing";
import { photoPlan, type EditorialPhoto } from "@/data/photo-plan";
import { isContactFormEnabled } from "@/lib/contact-config";
import { LegalPage } from "./LegalPage";

function Photo({
  photo,
  locale,
  hero = false,
}: {
  photo: EditorialPhoto;
  locale: Locale;
  hero?: boolean;
}) {
  const t = getContent(locale).common;
  return (
    <figure className={`editorial-photo ${hero ? "editorial-photo-hero" : ""}`}>
      <div className="editorial-photo-frame">
        <Image
          src={photo.src}
          alt={photo.alt[locale]}
          fill
          sizes={
            hero
              ? "(max-width: 767px) 100vw, 55vw"
              : "(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 33vw"
          }
          preload={hero}
        />
      </div>
      <figcaption>
        {t.illustration}
        <span>
          ©{" "}
          <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
            {photo.credit}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="editorial-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
function Hero({
  locale,
  title,
  description,
  eyebrow,
  photo,
  service,
}: {
  locale: Locale;
  title: string;
  description: string;
  eyebrow: string;
  photo?: EditorialPhoto;
  service?: string;
}) {
  const t = getContent(locale).common;
  return (
    <section className={`editorial-hero ${photo ? "" : "editorial-hero-text"}`}>
      <Container>
        <div className="editorial-hero-grid">
          <div className="editorial-hero-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="editorial-lead">{description}</p>
            {photo && (
              <div className="button-row">
                <Button
                  href={`${pagePath("contact", locale)}${service ? `?service=${service}` : ""}`}
                >
                  {t.projectCta}
                </Button>
                <Link className="text-link" href={pagePath("services", locale)}>
                  {service ? t.backServices : t.servicesCta}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          {photo && <Photo photo={photo} locale={locale} hero />}
        </div>
      </Container>
    </section>
  );
}
function CTA({ locale, service }: { locale: Locale; service?: string }) {
  const t = getContent(locale).common;
  return (
    <section className="editorial-cta">
      <Container>
        <div>
          <p className="eyebrow">Thermobau V&V · Ludwigshafen</p>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <Button
          href={`${pagePath("contact", locale)}${service ? `?service=${service}` : ""}`}
        >
          {t.projectCta}
        </Button>
      </Container>
    </section>
  );
}
function Process({
  locale,
  steps,
}: {
  locale: Locale;
  steps?: { title: string; text: string }[];
}) {
  const t = getContent(locale);
  return (
    <section className="section editorial-process">
      <Container>
        <Heading title={t.common.processTitle} />
        <ol>
          {(steps ?? t.process).map((s, i) => (
            <li key={s.title}>
              <span className="editorial-index">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
function FAQ({
  locale,
  items,
}: {
  locale: Locale;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="section">
      <Container className="editorial-faq">
        <Heading eyebrow="FAQ" title={getContent(locale).common.faqTitle} />
        <div>
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
function Cards({
  locale,
  variant,
}: {
  locale: Locale;
  variant: "home" | "services";
}) {
  const t = getContent(locale);
  return (
    <div className="editorial-cards">
      {getServices(locale).map((s, i) => (
        <article className="editorial-card" key={s.slug}>
          <Photo
            photo={
              (variant === "home"
                ? photoPlan.homeCards
                : photoPlan.servicesCards)[s.slug]
            }
            locale={locale}
          />
          <div className="editorial-card-copy">
            <span className="editorial-index">0{i + 1}</span>
            <h3>
              <Link href={servicePath(s.slug, locale)}>
                {s.title}
                <ArrowUpRight size={22} aria-hidden="true" />
              </Link>
            </h3>
            <p>{s.teaser}</p>
            {variant === "services" && (
              <ul>
                {s.highlights.slice(0, 2).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
            <Link
              className="text-link"
              href={servicePath(s.slug, locale)}
              aria-label={`${t.common.detailsCta}: ${s.title}`}
            >
              {t.common.detailsCta}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
function ServiceLinks({
  locale,
  exclude,
}: {
  locale: Locale;
  exclude?: string;
}) {
  return (
    <div className="editorial-service-links">
      {getServices(locale)
        .filter((s) => s.slug !== exclude)
        .map((s) => (
          <Link key={s.slug} href={servicePath(s.slug, locale)}>
            {s.title}
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        ))}
    </div>
  );
}
export function ServicePage({
  locale,
  service: s,
}: {
  locale: Locale;
  service: LocalizedService;
}) {
  const t = getContent(locale);
  const detailPhoto = photoPlan.serviceDetails[s.slug];
  return (
    <>
      <Hero
        locale={locale}
        eyebrow={t.common.allServices}
        title={s.seo.title}
        description={s.teaser}
        photo={photoPlan.serviceHeroes[s.slug]}
        service={s.slug}
      />
      <section className="section">
        <Container className="editorial-split">
          <div>
            <Heading title={s.details.heading} description={s.description} />
            <p className="editorial-paragraph">{s.details.detail}</p>
          </div>
          <div className="editorial-worklist">
            <h2>{t.common.typicalWork}</h2>
            <ul>
              {s.highlights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="section editorial-warm">
        <Container className="editorial-split">
          {detailPhoto ? (
            <Photo photo={detailPhoto} locale={locale} />
          ) : (
            <div className="editorial-service-number">
              <span>
                0{getServices(locale).findIndex((x) => x.slug === s.slug) + 1} /
                06
              </span>
              <h2>{s.title}</h2>
              <p>{s.details.planningText}</p>
            </div>
          )}
          <div>
            <p className="eyebrow">{t.common.planning}</p>
            <h2>{s.details.planningHeading}</h2>
            {detailPhoto && (
              <p className="editorial-paragraph">{s.details.planningText}</p>
            )}
            <ul className="editorial-checklist">
              {s.details.preparation.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <Button href={`${pagePath("contact", locale)}?service=${s.slug}`}>
              {t.common.projectCta}
            </Button>
          </div>
        </Container>
      </section>
      <Process locale={locale} steps={s.details.steps} />
      <FAQ locale={locale} items={s.faq} />
      <section className="section editorial-warm">
        <Container>
          <Heading title={t.common.relatedServices} />
          <ServiceLinks locale={locale} exclude={s.slug} />
        </Container>
      </section>
      <CTA locale={locale} service={s.slug} />
    </>
  );
}
export function WebsitePage({
  locale,
  page,
}: {
  locale: Locale;
  page: PageKey;
}) {
  const t = getContent(locale);
  if (page === "legal" || page === "privacy" || page === "terms")
    return <LegalPage locale={locale} page={page} />;
  if (page === "home")
    return (
      <>
        <Hero locale={locale} {...t.home} photo={photoPlan.homeHero} />
        <section className="section">
          <Container>
            <Heading
              title={t.home.servicesTitle}
              description={t.home.servicesDescription}
            />
            <Cards locale={locale} variant="home" />
          </Container>
        </section>
        <section className="section editorial-dark">
          <Container className="editorial-split">
            <Heading title={t.home.workTitle} description={t.home.workText} />
            <div className="editorial-work-types">
              {t.home.workTypes.map((x, i) => (
                <div key={x.title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{x.title}</h3>
                    <p>{x.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <section className="section editorial-warm">
          <Container>
            <Heading title={t.home.whyTitle} />
            <div className="editorial-facts">
              {t.home.why.map((x) => (
                <article key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
        <Process locale={locale} />
        <FAQ
          locale={locale}
          items={t.home.faq.map(([question, answer]) => ({ question, answer }))}
        />
        <section className="section editorial-warm">
          <Container>
            <Heading
              title={t.home.galleryTitle}
              description={t.home.galleryDescription}
            />
            <div className="editorial-mini-gallery">
              {photoPlan.homeGallery.map((p) => (
                <Photo key={p.src} photo={p} locale={locale} />
              ))}
            </div>
            <p className="editorial-caption">{t.common.illustrationNote}</p>
            <Link href={pagePath("gallery", locale)} className="text-link">
              {t.common.galleryLink}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Container>
        </section>
        <Location locale={locale} />
        <CTA locale={locale} />
      </>
    );
  if (page === "services")
    return (
      <>
        <Hero locale={locale} {...t.services} photo={photoPlan.servicesHero} />
        <section className="section">
          <Container>
            <Cards locale={locale} variant="services" />
          </Container>
        </section>
        <section className="section editorial-dark">
          <Container className="editorial-split">
            <Heading
              title={t.services.combinedTitle}
              description={t.services.combinedText}
            />
            <ul className="editorial-checklist">
              {t.services.combinedPoints.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Container>
        </section>
        <Process locale={locale} />
        <CTA locale={locale} />
      </>
    );
  if (page === "about")
    return (
      <>
        <Hero locale={locale} {...t.about} photo={photoPlan.about} />
        <section className="section">
          <Container className="editorial-split">
            <Heading title={t.about.introTitle} />
            <div className="editorial-prose">
              {t.about.paragraphs.map((x) => (
                <p key={x}>{x}</p>
              ))}
              <ContactDetails locale={locale} />
            </div>
          </Container>
        </section>
        <section className="section editorial-warm">
          <Container>
            <Heading title={t.about.fieldsTitle} />
            <ServiceLinks locale={locale} />
          </Container>
        </section>
        <section className="section">
          <Container className="editorial-split">
            <Heading
              title={t.about.approachTitle}
              description={t.about.approachText}
            />
            <ul className="editorial-checklist">
              {t.contact.preparation.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </Container>
        </section>
        <Process locale={locale} />
        <CTA locale={locale} />
      </>
    );
  if (page === "gallery")
    return (
      <>
        <Hero locale={locale} {...t.gallery} />
        <section className="section editorial-gallery-section">
          <Container>
            <p className="editorial-notice">{t.gallery.notice}</p>
            <nav className="editorial-filters" aria-label={t.gallery.allLabel}>
              {getServices(locale).map((s) => (
                <a key={s.slug} href={`#${s.slug}`}>
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="editorial-gallery">
              {getServices(locale).map((s, i) => (
                <article key={s.slug} id={s.slug}>
                  <Photo photo={photoPlan.gallery[s.slug]} locale={locale} />
                  <div>
                    <span className="editorial-index">0{i + 1}</span>
                    <h2>{s.title}</h2>
                    <p>{s.teaser}</p>
                    <Link
                      className="text-link"
                      href={servicePath(s.slug, locale)}
                    >
                      {t.common.detailsCta}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
        <CTA locale={locale} />
      </>
    );
  return (
    <>
      <Hero locale={locale} {...t.contact} />
      <section className="section editorial-contact">
        <Container className="editorial-contact-grid">
          <div>
            <Heading title={t.contact.detailsTitle} />
            <ContactDetails locale={locale} />
            <div className="editorial-contact-guide">
              <h2>{t.contact.prepareTitle}</h2>
              <p>{t.contact.prepareText}</p>
              <ul className="editorial-checklist">
                {t.contact.preparation.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <Suspense fallback={<p>{t.contact.demoText}</p>}>
            <ContactFormWithQuery
              locale={locale}
              enabled={isContactFormEnabled()}
            />
          </Suspense>
        </Container>
      </section>
      <Location locale={locale} />
    </>
  );
}
