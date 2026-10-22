import Image from "next/image";
import { galleryItems } from "@/data/projects";
import type { GalleryItem } from "@/types/content";

export function Gallery({
  limit,
  items = galleryItems,
}: {
  limit?: number;
  items?: GalleryItem[];
} = {}) {
  const visibleItems = items
    .filter((item) => item.published && item.rightsConfirmed)
    .slice(0, limit);

  return (
    <>
      {visibleItems.some((item) => item.kind !== "real-project") && (
        <p className="gallery-notice">
          Die gezeigten Bilder dienen der Veranschaulichung unserer
          Tätigkeitsbereiche und stellen keine dokumentierten Referenzprojekte
          von Thermobau V&V dar.
        </p>
      )}
      <div className="gallery-grid">
        {visibleItems.map((item) => (
          <figure className="gallery-card" key={item.id}>
            <div className="gallery-image">
              <Image
                src={item.imageSrc}
                alt={item.alt}
                width={720}
                height={480}
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
              />
              <span className="image-label">
                {item.kind === "illustration"
                  ? "Symbolbild · Illustration"
                  : item.kind === "stock-photo"
                    ? "Symbolbild"
                    : "Dokumentiertes Projekt"}
              </span>
            </div>
            <figcaption>
              <h3>
                {item.kind === "real-project" && item.projectTitle
                  ? item.projectTitle
                  : item.title}
              </h3>
              {item.description && (
                <p className="gallery-description">{item.description}</p>
              )}
              {item.kind === "real-project" && item.location && (
                <p>{item.location}</p>
              )}
              {item.kind === "real-project" && item.date && <p>{item.date}</p>}
              {item.copyrightCredit && (
                <p className="photo-credit">
                  Foto:{" "}
                  {item.sourceUrl ? (
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      {item.copyrightCredit}
                      <span className="sr-only">
                        {" "}
                        (Bildquelle, öffnet in einem neuen Tab)
                      </span>
                    </a>
                  ) : (
                    item.copyrightCredit
                  )}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
      {visibleItems.length === 0 && (
        <p>Zurzeit sind keine Bilder zur Veröffentlichung freigegeben.</p>
      )}
    </>
  );
}
