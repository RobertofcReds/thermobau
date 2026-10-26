import Image from "next/image";

export function Photo({
  image,
  className = "",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: {
  image: { src: string; alt: string };
  className?: string;
  priority?: boolean;
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
    </figure>
  );
}
