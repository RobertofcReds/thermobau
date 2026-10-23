import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { photoPlan, type EditorialPhoto } from "@/data/photo-plan";
function collect(value: unknown): EditorialPhoto[] {
  if (typeof value !== "object" || value === null) return [];
  if ("src" in value) return [value as EditorialPhoto];
  return Object.values(value).flatMap(collect);
}
const photos = collect(photoPlan);
describe("editorial photo placements", () => {
  it("uses 31 different photographs with no repeated placement", () => {
    expect(photos).toHaveLength(31);
    expect(new Set(photos.map((p) => p.src)).size).toBe(31);
    expect(
      new Set(photos.map((p) => p.sourceUrl.match(/(\d+)\/$/)?.[1])).size,
    ).toBe(31);
  });
  it.each(photos)(
    "has a local file, credit, Pexels source and all three alt texts for $src",
    (p) => {
      expect(p.src).toMatch(/^\/images\/photos\/[a-z0-9-]+\.webp$/);
      expect(existsSync(join(process.cwd(), "public", p.src))).toBe(true);
      expect(p.credit.length).toBeGreaterThan(5);
      expect(p.sourceUrl).toMatch(
        /^https:\/\/www\.pexels\.com\/photo\/.+-\d+\/$/,
      );
      for (const locale of ["de", "en", "fr"] as const)
        expect(p.alt[locale].length).toBeGreaterThan(10);
    },
  );
  it("does not use the unrelated old real-estate hero or the misclassified tiling photo", () => {
    expect(photos.map((p) => p.src)).not.toContain("/images/photos/hero.webp");
    expect(photos.map((p) => p.src)).not.toContain(
      "/images/photos/pexels-38076239.webp",
    );
  });
});
