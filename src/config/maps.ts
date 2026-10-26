/** Nominatim matched house 59, Blücherstraße, 67063 Ludwigshafen am Rhein.
 * Verified on 2026-10-23 against OSM building way 298541737.
 * This verifies the supplied address, not a business listing or opening hours. */
export const verifiedMapLocation: {
  latitude: number;
  longitude: number;
  verifiedSource: string;
} | null = {
  latitude: 49.4878874,
  longitude: 8.433252,
  verifiedSource: "https://www.openstreetmap.org/way/298541737",
};

export type MapView = "roadmap" | "satellite";

// Google's keyless website embed, verified in both modes. This is not the
// keyed Maps Embed API v1. Keep provider attribution and recheck before launch.
export function getMapEmbedUrl(view: MapView, locale: "de" | "en" | "fr") {
  if (!verifiedMapLocation) return null;
  return `https://www.google.com/maps?${new URLSearchParams({
    q: `${verifiedMapLocation.latitude},${verifiedMapLocation.longitude}`,
    z: "17",
    t: view === "satellite" ? "k" : "m",
    output: "embed",
    hl: locale,
  })}`;
}
