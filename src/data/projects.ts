import { services } from "@/data/services";
import { photos } from "@/data/photos";
import type { GalleryItem, ServiceSlug } from "@/types/content";

const servicePhotos = {
  fassaden: photos.facadeBrick,
  trockenbau: photos.drywallDetail,
  putzarbeiten: photos.paintingPrep,
  malerarbeiten: photos.paintingDetail,
  fliesenarbeiten: photos.tilesWall,
  renovierungen: photos.renovationKitchen,
} satisfies Record<ServiceSlug, (typeof photos)[keyof typeof photos]>;

// Licensed stock photographs illustrate the trades; they are not company projects.
// Real projects require independently confirmed facts and image permissions.
export const galleryItems: GalleryItem[] = services.map((service) => {
  const photo = servicePhotos[service.slug];
  return {
    id: `symbolbild-${service.slug}`,
    serviceSlug: service.slug,
    title: service.title,
    description: service.teaser,
    imageSrc: photo.src,
    alt: photo.alt,
    photos: [{ src: photo.src, alt: photo.alt, rightsConfirmed: true }],
    kind: "stock-photo",
    copyrightCredit: photo.credit,
    sourceUrl: photo.sourceUrl,
    rightsConfirmed: true,
    projectTitle: null,
    location: null,
    date: null,
    published: true,
  };
});

export const publishedGalleryItems = galleryItems.filter(
  (item) => item.published && item.rightsConfirmed,
);
