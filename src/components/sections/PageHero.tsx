import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
export function PageHero({
  title,
  eyebrow,
  description,
  parent,
  navKey,
  displayTitle,
  image,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  parent?: { label: string; href: string };
  navKey?: "leistungen" | "ueber-uns" | "referenzen" | "kontakt";
  displayTitle?: ReactNode;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <section
      className={`page-hero ${image ? "page-hero-photographic" : ""}`}
      data-nav={
        navKey ?? (parent?.href === "/leistungen" ? "leistungen" : undefined)
      }
    >
      <Container>
        <Breadcrumbs items={[...(parent ? [parent] : []), { label: title }]} />
        <div className={image ? "page-hero-grid" : undefined}>
          <div className="page-hero-content">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{displayTitle ?? title}</h1>
            <p className="lead">{description}</p>
            {children && <div className="hero-actions">{children}</div>}
          </div>
          {image && (
            <Photo image={image} priority className="page-hero-photo" />
          )}
        </div>
      </Container>
    </section>
  );
}
