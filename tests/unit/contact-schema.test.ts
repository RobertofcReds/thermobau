import { describe, expect, it } from "vitest";
import { contactFieldErrors, contactSchema } from "@/lib/contact-schema";
import { serviceSlugs } from "@/data/services";

const valid = {
  name: "Erika Muster",
  email: "erika@example.test",
  phone: "",
  service: "trockenbau",
  message: "Ich möchte mein Vorhaben mit Ihnen besprechen.",
  website: "",
};

describe("contact schema", () => {
  it("normalizes a valid request and allows an omitted optional phone", () => {
    const result = contactSchema.parse({
      ...valid,
      name: "  Erika Muster  ",
      phone: undefined,
    });
    expect(result.name).toBe("Erika Muster");
    expect(result.phone).toBe("");
  });

  it.each(serviceSlugs)("allows the approved service %s", (service) => {
    expect(contactSchema.safeParse({ ...valid, service }).success).toBe(true);
  });

  it.each([
    ["name", "A"],
    ["name", "A".repeat(101)],
    ["email", "not-an-email"],
    ["phone", "1".repeat(31)],
    ["service", "heizung"],
    ["message", "x".repeat(19)],
    ["message", "x".repeat(3001)],
    ["name", "Erika\r\nBcc: someone@example.test"],
    ["email", "erika@example.test\r\n"],
    ["message", "Text mit <script>alert(1)</script>"],
    ["phone", "<img src=x onerror=alert(1)>"],
    ["message", "Ungültiger Text mit \u0000 Steuerzeichen"],
  ])("rejects invalid %s values", (field, value) => {
    const result = contactSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(contactFieldErrors(result.error)).toHaveProperty(field);
  });

  it("accepts inclusive length boundaries and multiline messages", () => {
    expect(
      contactSchema.safeParse({
        ...valid,
        name: "Ab",
        phone: "1".repeat(30),
        message: "x".repeat(20),
      }).success,
    ).toBe(true);
    expect(
      contactSchema.safeParse({
        ...valid,
        name: "A".repeat(100),
        message: "x".repeat(3000),
      }).success,
    ).toBe(true);
    expect(
      contactSchema.safeParse({
        ...valid,
        message: "Eine Beschreibung.\nEine weitere Zeile.",
      }).success,
    ).toBe(true);
  });

  it("rejects unexpected properties and non-objects", () => {
    expect(
      contactSchema.safeParse({ ...valid, recipient: "other@example.test" })
        .success,
    ).toBe(false);
    expect(contactSchema.safeParse(null).success).toBe(false);
  });

  it.each([42, "x".repeat(201)])(
    "returns German honeypot field errors for invalid values",
    (website) => {
      const result = contactSchema.safeParse({ ...valid, website });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(contactFieldErrors(result.error).website).toEqual([
          "Bitte lassen Sie dieses Feld leer.",
        ]);
      }
    },
  );
});
