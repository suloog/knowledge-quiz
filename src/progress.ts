import type { Deck } from '@/content';
import { load, save } from '@/storage';

// How far a category's deck has been gone through: its shuffled order of question ids, and how
// many of them have been seen — the deck only moves forward, so the seen cards are the first
// `seen` of the order (MOD-03-F06, F07; DEC-22, DEC-38).
export type Progress = { order: string[]; seen: number };

// Fisher–Yates.
export const shuffle = <T>(items: readonly T[]): T[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const isProgress = (value: unknown): value is Progress => {
  if (typeof value !== 'object' || value === null) return false;
  const { order, seen } = value as Partial<Progress>;
  return (
    Array.isArray(order) &&
    order.every(id => typeof id === 'string') &&
    new Set(order).size === order.length &&
    Number.isInteger(seen) &&
    (seen as number) >= 0 &&
    (seen as number) <= order.length
  );
};

// A saved progress against the deck's questions as they are now, or undefined when what was saved
// is not a progress. The saved order is kept, questions no longer in the deck are skipped, and
// questions new to it join the unseen rest, each at a random place (Q37, DEC-55).
export const restore = (
  saved: unknown,
  ids: readonly string[],
): Progress | undefined => {
  if (!isProgress(saved)) return undefined;
  const current = new Set(ids);
  const kept = (part: string[]) => part.filter(id => current.has(id));
  const seen = kept(saved.order.slice(0, saved.seen));
  const unseen = kept(saved.order.slice(saved.seen));
  const known = new Set(saved.order);
  for (const id of shuffle(ids.filter(id => !known.has(id))))
    unseen.splice(Math.floor(Math.random() * (unseen.length + 1)), 0, id);
  return { order: [...seen, ...unseen], seen: seen.length };
};

const key = (category: string) => `deck-${category}`;

// The category's deck shuffled anew, every card unseen, and saved: a deck never opened or saved
// unreadably, and the end card's "again" (MOD-03-F10, DEC-23).
export const restartDeck = (deck: Deck): Progress => {
  const progress = {
    order: shuffle(deck.questions.map(question => question.id)),
    seen: 0,
  };
  save(key(deck.category), progress);
  return progress;
};

// The category's deck as it was left: its saved order at the first unseen card, or finished — every
// card seen — when it was gone through to the end, so the end card comes back (MOD-03-F09, DEC-56).
// A deck never opened or saved unreadably starts with a new shuffle, saved at once, so the order
// holds after a restart even before the first answer is revealed.
export const openDeck = (deck: Deck): Progress => {
  const ids = deck.questions.map(question => question.id);
  const restored = restore(load(key(deck.category)), ids);
  if (!restored) return restartDeck(deck);
  save(key(deck.category), restored);
  return restored;
};

// Every card of the deck has been seen: its end card is shown.
export const isFinished = (progress: Progress) =>
  progress.seen === progress.order.length;

// The first unseen card has had its answer revealed: it is seen from now on, saved at once.
export const markSeen = (category: string, progress: Progress): Progress => {
  const seen = { ...progress, seen: progress.seen + 1 };
  save(key(category), seen);
  return seen;
};
