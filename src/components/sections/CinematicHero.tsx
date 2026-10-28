"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pagePath, type Locale } from "@/i18n/routing";
import type { EditorialPhoto } from "@/data/photo-plan";

const copy = {
  de: {
    carousel: "Einblicke in die Tätigkeitsbereiche",
    controls: "Hero-Bilder auswählen",
    show: "Bild anzeigen",
    pause: "Animationen pausieren",
    play: "Animationen starten",
    frames: ["Fassadenarbeiten", "Renovierung", "Innenausbau"],
  },
  en: {
    carousel: "A view of our areas of work",
    controls: "Choose a hero image",
    show: "Show image",
    pause: "Pause animations",
    play: "Start animations",
    frames: ["Facade work", "Renovation", "Interior finishing"],
  },
  fr: {
    carousel: "Aperçu des domaines d’activité",
    controls: "Choisir une image d’accueil",
    show: "Afficher l’image",
    pause: "Mettre les animations en pause",
    play: "Lancer les animations",
    frames: ["Travaux de façade", "Rénovation", "Aménagement intérieur"],
  },
};
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const reducedMotionSnapshot = () => window.matchMedia(motionQuery).matches;

/** Only the first photograph is sent on the initial render. The next photograph
 * warms after first load; a transition never exposes an unloaded photograph. */
export function CinematicHero({
  locale,
  slides,
  content,
}: {
  locale: Locale;
  slides: EditorialPhoto[];
  content: {
    eyebrow: string;
    title: string;
    description: string;
    projectCta: string;
    servicesCta: string;
  };
}) {
  const t = copy[locale];
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    reducedMotionSnapshot,
    () => true,
  );
  const [slide, setSlide] = useState({
    active: 0,
    sequence: 0,
    directions: { 0: "out" } as Record<number, "in" | "out">,
  });
  const active = slide.active;
  const [mounted, setMounted] = useState([0]);
  const [ready, setReady] = useState<number[]>([]);
  const loaded = useRef(new Set<number>());
  const [requested, setRequested] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [controlsHovered, setControlsHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const root = useRef<HTMLElement>(null);
  const motionPaused = reducedMotion || userPaused || !inView || !tabVisible;
  const paused = motionPaused || focusPaused || controlsHovered;
  const next = (active + 1) % slides.length;
  const activeReady = ready.includes(active);

  function activate(index: number) {
    setSlide((previous) => {
      if (previous.active === index) return previous;
      const sequence = previous.sequence + 1;
      return {
        active: index,
        sequence,
        directions: {
          ...previous.directions,
          [index]: sequence % 2 === 0 ? "out" : "in",
        },
      };
    });
  }

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    // Restart only the incoming photo. The outgoing animation stays paused at
    // its current scale throughout the crossfade, avoiding a visible snap.
    const image = root.current?.querySelector<HTMLImageElement>(
      ".cinematic-slide.is-active img",
    );
    for (const animation of image?.getAnimations() ?? [])
      animation.currentTime = 0;
  }, [slide.sequence]);

  useEffect(() => {
    if (paused || !activeReady) return;
    const warm = window.setTimeout(() => {
      setMounted((items) => (items.includes(next) ? items : [...items, next]));
    }, 2000);
    const advance = window.setInterval(() => {
      if (loaded.current.has(next)) activate(next);
    }, 12000);
    return () => {
      window.clearTimeout(warm);
      window.clearInterval(advance);
    };
  }, [activeReady, next, paused]);

  function select(index: number) {
    setUserPaused(true);
    if (ready.includes(index)) {
      setRequested(null);
      activate(index);
    } else {
      setRequested(index);
      setMounted((items) =>
        items.includes(index) ? items : [...items, index],
      );
    }
  }

  return (
    <section
      ref={root}
      className="cinematic-hero"
      aria-labelledby="home-hero-title"
      data-active-slide={active}
      data-playback={paused ? "paused" : "playing"}
      data-motion={motionPaused ? "paused" : "playing"}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocusPaused(false);
      }}
    >
      <div className="cinematic-media" role="group" aria-label={t.carousel}>
        {slides.map(
          (photo, index) =>
            mounted.includes(index) && (
              <div
                key={photo.src}
                className={`cinematic-slide ${index === active ? "is-active" : ""}`}
                data-slide-index={index}
                data-zoom={slide.directions[index]}
                aria-hidden={index !== active}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt[locale]}
                  fill
                  sizes="100vw"
                  preload={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                  onLoad={() => {
                    loaded.current.add(index);
                    setReady((items) =>
                      items.includes(index) ? items : [...items, index],
                    );
                    if (requested === index) {
                      activate(index);
                      setRequested(null);
                    }
                  }}
                  onError={() => setRequested(null)}
                />
              </div>
            ),
        )}
      </div>
      <Container className="cinematic-inner">
        <div className="cinematic-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="home-hero-title">{content.title}</h1>
          <p className="cinematic-lead">{content.description}</p>
          <div className="cinematic-actions">
            <Button href={pagePath("contact", locale)}>
              {content.projectCta}
            </Button>
            <Button href={pagePath("services", locale)} secondary>
              {content.servicesCta}
            </Button>
          </div>
        </div>
        <div className="cinematic-bottom">
          <p className="cinematic-scene" aria-hidden="true">
            <span>
              0{active + 1} / 0{slides.length}
            </span>
            {t.frames[active]}
          </p>
          <div
            className="cinematic-controls"
            role="group"
            aria-label={t.controls}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setControlsHovered(true);
            }}
            onPointerLeave={() => setControlsHovered(false)}
          >
            {slides.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className="cinematic-dot"
                data-slide={index}
                aria-label={`${t.show} ${index + 1} : ${t.frames[index]}`}
                aria-pressed={active === index}
                onClick={() => select(index)}
              >
                <span />
              </button>
            ))}
            {!reducedMotion && (
              <button
                type="button"
                className="cinematic-playback"
                aria-label={userPaused ? t.play : t.pause}
                onClick={() => {
                  setUserPaused((value) => !value);
                  // Explicitly starting is allowed while the play control has
                  // focus; the next keyboard focus change pauses rotation again.
                  if (userPaused) setFocusPaused(false);
                }}
              >
                {userPaused ? (
                  <Play size={17} aria-hidden="true" />
                ) : (
                  <Pause size={17} aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
