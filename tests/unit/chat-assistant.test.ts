import { describe, expect, it } from "vitest";
import { answerQuestion, detectChatLocale } from "@/lib/chat-assistant";
import { contactChannels } from "@/lib/company-contact";
import { siteConfig } from "@/config/site";
import { serviceSlugs } from "@/data/service-identifiers";

describe("Local Thermobau assistant", () => {
  it.each([
    ["Welche Leistungen bieten Sie an?", "de"],
    ["Bonjour, quelles sont vos prestations ?", "fr"],
    ["What services do you offer?", "en"],
    ["Bonjour, Trockenbau ?", "fr"],
    ["Quelle est votre adresse ?", "fr"],
    ["Les photos sont elles vos projets ?", "fr"],
    ["I need painting in Ludwigshafen", "en"],
    ["Was kostet peinture?", "de"],
  ] as const)("detects the language of %s", (question, expected) => {
    expect(detectChatLocale(question)).toBe(expected);
    expect(answerQuestion(question).locale).toBe(expected);
  });

  it.each([
    ["Bitte antworte in English", "en"],
    ["Reply en français", "fr"],
    ["Réponds auf Deutsch", "de"],
  ] as const)(
    "honours explicit language requests: %s",
    (question, expected) => {
      const reply = answerQuestion(question, "de");
      expect(reply.locale).toBe(expected);
      expect(reply.topic).toBe("language");
    },
  );

  it("keeps the conversation language for ambiguous messages", () => {
    expect(detectChatLocale("contact", "fr")).toBe("fr");
    expect(detectChatLocale("WhatsApp", "en")).toBe("en");
    expect(answerQuestion("???").locale).toBe("de");
  });

  it.each([
    ["Was macht ihr an Fassaden?", "fassaden"],
    ["Do you install drywall?", "trockenbau"],
    ["Parlez-moi des enduits", "putzarbeiten"],
    ["Je souhaite de la peinture", "malerarbeiten"],
    ["Do you offer tiling?", "fliesenarbeiten"],
    ["Eine Renovierung bitte", "renovierungen"],
    ["Ich möchte mein Haus renovieren", "renovierungen"],
    ["I need painting in Ludwigshafen", "malerarbeiten"],
  ] as const)("links to the appropriate service for %s", (question, slug) => {
    const reply = answerQuestion(question);
    expect(reply.topic).toBe(`service:${slug}`);
    expect(reply.links[0].href).toMatch(
      /^\/(leistungen|en\/services|fr\/prestations)\//,
    );
  });

  it("answers multiple service requests instead of arbitrarily choosing one", () => {
    const reply = answerQuestion("Je souhaite des cloisons et de la peinture");
    expect(reply.locale).toBe("fr");
    expect(reply.topic).toBe("services");
    expect(reply.links.map(({ href }) => href)).toContain(
      "/fr/prestations/cloisons-seches",
    );
    expect(reply.links.map(({ href }) => href)).toContain(
      "/fr/prestations/peinture",
    );
  });

  it("lists exactly the site's six areas of work", () => {
    const reply = answerQuestion("Welche Leistungen bieten Sie an?");
    expect(reply.topic).toBe("services");
    expect(reply.text.match(/• /g)).toHaveLength(serviceSlugs.length);
    expect(reply.links[0].href).toBe("/leistungen");
  });

  it("uses current configured contact details and validated links", () => {
    const reply = answerQuestion("Comment vous contacter ?");
    const channels = contactChannels(siteConfig);
    expect(reply.topic).toBe("contact");
    for (const channel of Object.values(channels)) {
      if (!channel) continue;
      expect(reply.links.some(({ href }) => href === channel.href)).toBe(true);
    }
    expect(reply.text).toContain(siteConfig.contactName);
    if (siteConfig.phone) expect(reply.text).toContain(siteConfig.phone);
    if (siteConfig.email) expect(reply.text).toContain(siteConfig.email);
  });

  it("uses the actual company address", () => {
    const reply = answerQuestion("Where are you located?");
    expect(reply.topic).toBe("address");
    expect(reply.text).toContain(siteConfig.address.street);
    expect(reply.text).toContain(siteConfig.address.postalCode);
  });

  it.each([
    ["Combien coûte la peinture de 20 m2 ?", "quote"],
    ["How much for painting?", "quote"],
    ["Wie kann ich Sie kontaktieren?", "contact"],
    ["Do you have time tomorrow for painting? When can you start?", "schedule"],
    ["Quels sont vos horaires ?", "hours"],
    ["Intervenez-vous aussi à Mannheim ?", "area"],
    ["Sind eure Konstruktionen für Brandschutz zertifiziert?", "limitations"],
    ["Les photos sont-elles vos réalisations ?", "photos"],
    ["Puis-je envoyer une demande dans le formulaire ?", "form"],
    ["Welche Angaben braucht ihr?", "preparation"],
    ["Welche Angaben braucht ihr für ein Angebot?", "preparation"],
    ["What information do you need for a quote?", "preparation"],
    ["Quelles informations faut-il pour un devis ?", "preparation"],
    ["Quelles données envoyer pour préparer le devis ?", "preparation"],
    ["What is the price including preparation?", "quote"],
    ["Does your contact form send a message?", "form"],
    ["Are my chat messages stored? What about privacy?", "privacy"],
  ] as const)("routes factual questions safely: %s", (question, topic) => {
    expect(answerQuestion(question).topic).toBe(topic);
  });

  it("does not invent prices, times or a service radius", () => {
    expect(
      answerQuestion("What is the price of painting 50 m2?").text,
    ).toContain("does not publish fixed prices");
    expect(answerQuestion("Are you available tomorrow?").text).toContain(
      "No available appointments",
    );
    expect(answerQuestion("Do you cover Paris?").text).toContain(
      "no fixed service radius",
    );
  });

  it("supports a short follow-up in a different language", () => {
    const reply = answerQuestion(
      "More details please",
      "de",
      "service:trockenbau",
    );
    expect(reply.locale).toBe("en");
    expect(reply.topic).toBe("service:trockenbau");
    expect(reply.text).toContain("Non-load-bearing");
    expect(reply.links[0].href).toBe("/en/services/drywall");
  });

  it("does not mistake a substring for a service or echo arbitrary markup", () => {
    const reply = answerQuestion(
      "A complaint <script>alert('hello')</script> https://evil.example/",
    );
    expect(reply.topic).toBe("fallback");
    expect(reply.text).not.toContain("<script>");
    expect(reply.links.every(({ href }) => href.startsWith("/"))).toBe(true);
    expect(reply.links.some(({ href }) => href.includes("evil"))).toBe(false);
  });

  it("does not accept a previous topic as a path or service identifier", () => {
    const reply = answerQuestion("More details", "en", "service:../../secret");
    expect(reply.topic).toBe("fallback");
    expect(reply.links.some(({ href }) => href.includes("secret"))).toBe(false);
  });
});
