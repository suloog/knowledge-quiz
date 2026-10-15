import { categories } from '@/content';
import { load, save } from '@/storage';

// The category opened last, kept on the device so the category screen's continue entry can lead
// back to it, also after the app was closed (MOD-02-F05, F07).
const KEY = 'last-category';

// The category opened last; undefined before any was opened, or when what was saved is not a
// category the content holds — the screen then shows no continue entry (MOD-02-F08).
export const lastCategory = (): string | undefined => {
  const saved = load(KEY);
  return typeof saved === 'string' && categories.includes(saved)
    ? saved
    : undefined;
};

export const rememberCategory = (category: string) => save(KEY, category);
