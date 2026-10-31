export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string;
};

export type SearchResult = SearchEntry & { score: number };

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const stopWords = new Set(
  (
    "der die das den dem des ein eine einer einem einen eines und oder in im am an auf " +
    "zu zum zur mit von fur bei ist sind ich sie wir ihr ihre ihren was wie welche welchen " +
    "the a an and or in on at to of for with is are i you your we our what how which " +
    "le la les un une des du de et ou en au aux dans pour par avec est sont je vous " +
    "nous notre votre vos mon ma mes ce cette ces que quel quels quelle quelles"
  ).split(" "),
);

// These groups only help find existing pages; they do not create new services.
const relatedTerms = [
  ["fassade", "fassaden", "fassadenarbeiten", "facade", "facades"],
  ["trockenbau", "drywall", "plasterboard", "cloison", "cloisons", "placo"],
  [
    "putz",
    "putzarbeiten",
    "verputzen",
    "plaster",
    "plastering",
    "enduit",
    "enduits",
  ],
  [
    "maler",
    "malerarbeiten",
    "streichen",
    "anstrich",
    "paint",
    "painting",
    "peinture",
    "peindre",
  ],
  [
    "fliese",
    "fliesen",
    "fliesenarbeiten",
    "tiles",
    "tiling",
    "carrelage",
    "carreler",
  ],
  [
    "renovierung",
    "renovierungen",
    "renovieren",
    "renovation",
    "renovations",
    "renover",
  ],
  ["kontakt", "contact", "contacter", "kontaktieren"],
  ["telefon", "phone", "telephone", "tel"],
  ["angebot", "angebote", "quote", "quotation", "devis"],
  [
    "kosten",
    "kostet",
    "preis",
    "preise",
    "cost",
    "price",
    "prices",
    "prix",
    "tarif",
    "tarifs",
  ],
];

function matchesWord(words: string[], term: string) {
  return words.some(
    (word) => word === term || (term.length >= 3 && word.startsWith(term)),
  );
}

/** Search the current language's small, serializable index entirely locally. */
export function searchSite(
  query: string,
  entries: SearchEntry[],
): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query.slice(0, 160));
  if (normalizedQuery.length < 2) return [];
  const terms = [...new Set(normalizedQuery.split(" "))].filter(
    (term) => term.length > 1 && !stopWords.has(term),
  );
  if (!terms.length) return [];

  return entries
    .map((entry) => {
      const title = normalizeSearchText(entry.title);
      const description = normalizeSearchText(entry.description);
      const titleWords = title.split(" ");
      const descriptionWords = description.split(" ");
      const keywords = entry.keywords.split(" ");
      let score = title === normalizedQuery ? 120 : 0;
      if (title.includes(normalizedQuery)) score += 60;
      if (terms.length > 1 && description.includes(normalizedQuery))
        score += 30;
      for (const term of terms) {
        const alternatives = [
          ...(relatedTerms.find((group) => group.includes(term)) ?? []),
          term.replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u"),
        ].filter((alternative) => alternative !== term);
        if (matchesWord(titleWords, term)) score += 40;
        else if (
          alternatives.some((alternative) =>
            matchesWord(titleWords, alternative),
          )
        )
          score += 25;
        else if (matchesWord(descriptionWords, term)) score += 14;
        else if (
          alternatives.some((alternative) =>
            matchesWord(descriptionWords, alternative),
          )
        )
          score += 12;
        else if (matchesWord(keywords, term)) score += 5;
        else if (
          alternatives.some((alternative) => matchesWord(keywords, alternative))
        )
          score += 3;
        else return null;
      }
      return { ...entry, score };
    })
    .filter((result): result is SearchResult => result !== null)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, 10);
}
