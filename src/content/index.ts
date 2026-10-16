import app from './app.json';
import { decks } from './decks';

export type AppContent = {
  title: string;
};

export const appContent: AppContent = app;

// The age categories the content data holds, youngest first — 3+, 4+, 5+ — whatever order the
// decks are registered in (MOD-02-F02, F03; DEC-48). The label is the same in both languages.
// A label that does not start with an age sorts after every one that does.
const youngestAge = (category: string) => {
  const age = Number.parseInt(category, 10);
  return Number.isNaN(age) ? Number.MAX_SAFE_INTEGER : age;
};
export const categories = decks
  .map(deck => deck.category)
  .sort((a, b) => youngestAge(a) - youngestAge(b));

export { decks };
export { illustrations } from './illustrations';
export type { ContentKind, Deck, Language, Question } from './deck';
