import app from './app.json';

export type AppContent = {
  title: string;
};

export const appContent: AppContent = app;

export { decks } from './decks';
export type { ContentKind, Deck, Language, Question } from './deck';
