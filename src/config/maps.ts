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

// Official OSM share/export iframe; no SDK, API key or runtime geocoding.
export const mapEmbedUrl = verifiedMapLocation
  ? `https://www.openstreetmap.org/export/embed.html?${new URLSearchParams({
      bbox: [
        verifiedMapLocation.longitude - 0.004,
        verifiedMapLocation.latitude - 0.0025,
        verifiedMapLocation.longitude + 0.004,
        verifiedMapLocation.latitude + 0.0025,
      ]
        .map((coordinate) => coordinate.toFixed(7))
        .join(","),
      layer: "mapnik",
      marker: `${verifiedMapLocation.latitude},${verifiedMapLocation.longitude}`,
    })}`
  : null;
