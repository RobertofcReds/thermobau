import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import type { Service } from "@/types/content";
export function ServiceGrid({ items = services }: { items?: Service[] }) {
  return (
    <div className="service-grid">
      {items.map((service) => (
        <Link
          className="service-card"
          key={service.slug}
          href={`/leistungen/${service.slug}`}
        >
          <div className="service-card-image">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              width={720}
              height={480}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />
          </div>
          <div className="service-card-content">
            <div className="service-card-title">
              <h3>{service.title}</h3>
              <ArrowUpRight size={22} aria-hidden="true" />
            </div>
            <p>{service.teaser}</p>
            <span className="text-link">
              Mehr erfahren <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
