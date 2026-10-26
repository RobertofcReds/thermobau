import { describe, expect, it } from "vitest";
import { getMapEmbedUrl, verifiedMapLocation } from "@/config/maps";

describe("inline map views", () => {
  for (const locale of ["de", "en", "fr"] as const) {
    it.each(["roadmap", "satellite"] as const)(
      `builds a %s embed for ${locale} at the verified address`,
      (view) => {
        const url = new URL(getMapEmbedUrl(view, locale)!);
        expect(url.origin).toBe("https://www.google.com");
        expect(url.pathname).toBe("/maps");
        expect(url.searchParams.get("output")).toBe("embed");
        expect(url.searchParams.get("q")).toBe(
          `${verifiedMapLocation!.latitude},${verifiedMapLocation!.longitude}`,
        );
        expect(url.searchParams.get("t")).toBe(
          view === "satellite" ? "k" : "m",
        );
        expect(url.searchParams.get("hl")).toBe(locale);
        expect(url.searchParams.get("z")).toBe("17");
      },
    );
  }
});
