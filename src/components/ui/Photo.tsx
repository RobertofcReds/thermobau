import Image from "next/image";

export function Photo({
  image,
  className = "",
  priority = false,
  caption = "Symbolbild · Kein Referenzprojekt von Thermobau V&V",
  sizes = "(max-width: 767px) 100vw, 50vw",
}: {
  image: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  caption?: string;
  sizes?: string;
}) {
  return (
    <figure className={`photo ${className}`}>
      <div className="photo-frame">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={priority}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
