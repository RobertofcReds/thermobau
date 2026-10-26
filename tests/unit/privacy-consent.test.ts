import { afterEach, describe, expect, it, vi } from "vitest";
import { CONSENT_KEY, CONSENT_TTL, parseConsent } from "@/lib/privacy-consent";

const now = Date.UTC(2026, 9, 23, 12);
const valid = { version: 4, maps: true, expires: now + CONSENT_TTL };

afterEach(() => {
  vi.useRealTimers();
});

describe("stored privacy consent", () => {
  it("uses the current storage version and a maximum lifetime of 180 days", () => {
    expect(CONSENT_KEY).toBe("thermobau-privacy-v4");
    expect(CONSENT_TTL).toBe(180 * 24 * 60 * 60 * 1000);
  });

  it.each([true, false])("restores an explicit maps=%s choice", (maps) => {
    const choice = { ...valid, maps };
    expect(parseConsent(JSON.stringify(choice), now)).toEqual(choice);
  });

  it.each([null, "", "accepted", "rejected", "{", "undefined"])(
    "ignores missing, corrupt, or legacy storage: %s",
    (raw) => {
      expect(parseConsent(raw, now)).toBeNull();
    },
  );

  it.each([null, true, false, 2, "accepted", [], {}])(
    "does not interpret unrelated JSON as consent: %j",
    (value) => {
      expect(parseConsent(JSON.stringify(value), now)).toBeNull();
    },
  );

  it.each([undefined, 1, 2, 3, "4"])(
    "requires a new choice for missing or different consent version %s",
    (version) => {
      expect(
        parseConsent(JSON.stringify({ ...valid, version }), now),
      ).toBeNull();
    },
  );

  it.each([undefined, null, "true", "false", 0, 1])(
    "never infers map permission from a non-boolean choice: %s",
    (maps) => {
      expect(parseConsent(JSON.stringify({ ...valid, maps }), now)).toBeNull();
    },
  );

  it.each([undefined, null, "2027-04-21", String(valid.expires)])(
    "rejects an absent or non-numeric expiry: %s",
    (expires) => {
      expect(
        parseConsent(JSON.stringify({ ...valid, expires }), now),
      ).toBeNull();
    },
  );

  it("rejects a non-finite expiry parsed from JSON", () => {
    expect(
      parseConsent('{"version":4,"maps":true,"expires":1e999}', now),
    ).toBeNull();
  });

  it.each([now - 1, now, now + CONSENT_TTL + 1])(
    "rejects expired choices and lifetimes exceeding the limit: %s",
    (expires) => {
      expect(
        parseConsent(JSON.stringify({ ...valid, expires }), now),
      ).toBeNull();
    },
  );

  it("keeps a valid choice until, but not including, its expiry", () => {
    const stored = JSON.stringify(valid);
    expect(parseConsent(stored, valid.expires - 1)).toEqual(valid);
    expect(parseConsent(stored, valid.expires)).toBeNull();
  });

  it("uses the current time when reading persisted storage without a supplied clock", () => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    const stored = JSON.stringify({ ...valid, maps: false });
    expect(parseConsent(stored)?.maps).toBe(false);
    vi.setSystemTime(valid.expires);
    expect(parseConsent(stored)).toBeNull();
  });
});
