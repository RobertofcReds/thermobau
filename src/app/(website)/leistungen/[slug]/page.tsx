import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Cta } from "@/components/sections/Cta";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getService, serviceDetails, services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return pageMetadata(
    service.seo.title,
    service.seo.description,
    `/leistungen/${service.slug}`,
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const details = serviceDetails[service.slug];
  const currentIndex = services.findIndex((item) => item.slug === slug);
  const relatedServices = [
    services[(currentIndex + 1) % services.length],
    services[(currentIndex + 2) % services.length],
  ];

  return (
    <>
      <PageHero
        title={service.title}
        eyebrow="Thermobau V&V · Ludwigshafen"
        description={service.teaser}
        parent={{ label: "Leistungen", href: "/leistungen" }}
        image={{ src: service.imageSrc, alt: service.imageAlt }}
      >
        <Button href={`/kontakt?service=${service.slug}`}>
          Projekt anfragen
        </Button>
        <Button href="#leistungsdetails" secondary>
          Mehr zur Leistung
        </Button>
      </PageHero>
      <section className="section scroll-mt-28" id="leistungsdetails">
        <Container className="service-detail-grid">
          <div>
            <p className="eyebrow">{service.title} im Überblick</p>
            <h2>{details.heading}</h2>
            <p>{service.description}</p>
            <p>{details.detail}</p>
          </div>
          <aside className="info-panel" aria-label="Typische Arbeiten">
            <h3>Typische Arbeiten</h3>
            <ul className="detail-points">
              {service.highlights.map((highlight) => (
                <li key={highlight}>
                  <Check size={18} className="shrink-0" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <p className="small-text">
              Welche Arbeiten zu Ihrem Vorhaben passen und übernommen werden
              können, wird vor einer Beauftragung abgestimmt.
            </p>
          </aside>
        </Container>
      </section>
      <section className="section about-section">
        <Container className="service-detail-grid">
          <Photo image={details.secondaryImage} />
          <div>
            <p className="eyebrow">Für Ihre erste Anfrage</p>
            <h2>{details.planningHeading}</h2>
            <p>{details.planningText}</p>
            <ul className="detail-points">
              {details.preparation.map((item) => (
                <li key={item}>
                  <Check size={18} className="shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button href={`/kontakt?service=${service.slug}`}>
              Vorhaben beschreiben
            </Button>
          </div>
        </Container>
      </section>
      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Von der Idee zur Abstimmung"
            title="So läuft Ihre Anfrage ab."
          />
          <ol className="process-grid process-grid-four">
            {details.steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="faq-section">
        <Container className="faq-layout">
          <SectionHeading
            eyebrow={`Häufige Fragen · ${service.title}`}
            title="Was Sie vorab wissen möchten."
          >
            <p>
              Antworten auf typische Fragen als Einstieg in Ihr Vorhaben. Die
              konkrete Ausführung besprechen wir anhand Ihrer Situation.
            </p>
          </SectionHeading>
          <div className="faq-list">
            {service.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <section className="section related-section">
        <Container>
          <div className="section-top">
            <SectionHeading
              eyebrow="Weiter entdecken"
              title="Weitere Tätigkeitsbereiche"
            />
          </div>
          <ServiceGrid items={relatedServices} />
        </Container>
      </section>
      <Cta service={service.slug} />
    </>
  );
}
