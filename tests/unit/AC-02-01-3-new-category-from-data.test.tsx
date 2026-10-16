// US-02-01#3 — a category added to the content data appears on the screen with no change to the
// screen (MOD-02-F03): the screen lists `categories` from src/content, built from the decks.
import { render, screen } from '@testing-library/react-native';
import CategoriesScreen from '../../src/app/index';
import { decks } from '../../src/content';
import { LanguageProvider } from '../../src/i18n';
import { readSource } from './support/sources';

const shipped: { category: string }[] = jest.requireActual(
  '../../src/content/decks',
).decks;
// Step 1's change to the content data: a "6+" deck, registered first.
jest.mock('../../src/content/decks', () => ({
  decks: [
    { category: '6+' },
    ...jest.requireActual('../../src/content/decks').decks,
  ],
}));

describe('AC-02-01-3 A category added to the content data appears with no change to the screen', () => {
  it('step 1 — a deck labelled "6+" is added to the shipped content data', () => {
    expect(decks.map(deck => deck.category)).toEqual([
      '6+',
      ...shipped.map(deck => deck.category),
    ]);
  });

  it('step 2 — the screen lists every shipped category, then "6+"', async () => {
    await render(
      <LanguageProvider>
        <CategoriesScreen />
      </LanguageProvider>,
    );
    const entries = screen
      .getAllByTestId(/^category-\d+$/)
      .map(entry => entry.props.children);

    expect(entries).toHaveLength(shipped.length + 1);
    shipped.forEach(deck => expect(entries).toContain(deck.category));
    expect(entries[entries.length - 1]).toBe('6+');
  });

  it('step 3 — the category screen names no category', () => {
    const source = readSource('src/app/index.tsx');
    expect(source).not.toMatch(/['"`]\d\+['"`]/);
  });
});
