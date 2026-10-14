// The shape of one age category's deck data file (src/content/decks/<category>.json), as proposed
// in DEC-46 — pending the tech lead's approval of the content data format (constitution).

export const CONTENT_KINDS = [
  'educational',
  'popular-science',
  'nature',
  'trivia',
] as const;

export type ContentKind = (typeof CONTENT_KINDS)[number];

export type Language = 'pl' | 'en';

// One question and its single answer, in one language.
export type QuestionText = {
  question: string;
  answer: string;
};

export type Question = {
  // Stable and unique across all decks; saved deck orders refer to it.
  id: string;
  kind: ContentKind;
  pl: QuestionText;
  en: QuestionText;
  // An illustration file name, only where a picture helps (US-03-05).
  illustration?: string;
};

export type Deck = {
  schemaVersion: 1;
  // The category's label, the same in both languages: "3+", "4+", "5+".
  category: string;
  questions: Question[];
};
