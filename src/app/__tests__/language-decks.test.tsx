import { I18nManager } from 'react-native';
import { act, fireEvent, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import { renderRouter } from 'expo-router/testing-library';
import RootLayout from '../_layout';
import CardScreen, { TOUCH_GUARD_MS } from '../cards/[category]';
import CategoriesScreen from '../index';

// A 3+ deck long enough for three revealed cards and a fourth to resume at.
jest.mock('@/content/decks', () => ({
  decks: [
    {
      category: '3+',
      questions: ['q1', 'q2', 'q3', 'q4', 'q5'].map(id => ({
        id,
        pl: { question: `Pytanie ${id}?`, answer: `Odpowiedź ${id}.` },
        en: { question: `Question ${id}?`, answer: `Answer ${id}.` },
      })),
    },
  ],
}));

// What the app keeps on the device, in memory: key → JSON.
const mockSaved = new Map<string, string>();
jest.mock('@/storage', () => ({
  load: (key: string) => {
    const value = mockSaved.get(key);
    return value === undefined ? undefined : JSON.parse(value);
  },
  save: (key: string, value: unknown) =>
    mockSaved.set(key, JSON.stringify(value)),
}));

const routes = {
  _layout: RootLayout,
  index: CategoriesScreen,
  'cards/[category]': CardScreen,
};

const wait = async () => {
  await act(async () => {
    jest.advanceTimersByTime(TOUCH_GUARD_MS + 100);
  });
};
// The 3+ entry in the list — the continue entry above it names 3+ too once it was opened.
const open3Plus = async () => {
  await fireEvent.press(screen.getByTestId('category-0'));
  await wait();
};
const touch = async () => {
  await fireEvent(screen.getByTestId(/^card-\d+$/), 'pressIn');
  await wait();
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
    isRTL: false,
    doLeftAndRightSwapInRTL: true,
    localeIdentifier: 'pl_PL',
  });
  // A shuffled deck stays in its data order.
  jest.spyOn(Math, 'random').mockReturnValue(0.999);
  mockSaved.clear();
});
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('Decks kept across a language switch (US-02-03)', () => {
  it('three cards of 3+ revealed, then a switch to English: 3+ resumes at its fourth card, in English (#4, MOD-02-F13)', async () => {
    await renderRouter(routes);
    await open3Plus();
    // Reveal, next card — three times over, the last one left revealed.
    for (let card = 0; card < 3; card++) {
      expect(screen.getByTestId(`card-${card}`)).toBeOnTheScreen();
      await touch();
      expect(screen.getByTestId('answer')).toBeOnTheScreen();
      if (card < 2) await touch();
    }
    const saved = JSON.parse(mockSaved.get('deck-3+')!);
    expect(saved.seen).toBe(3);
    await act(async () => router.back());

    await fireEvent.press(screen.getByTestId('language-en'));

    expect(JSON.parse(mockSaved.get('deck-3+')!)).toEqual(saved);
    await open3Plus();
    expect(screen.getByTestId('card-3')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Question q4?');
    expect(screen.queryByTestId('answer')).toBeNull();
  });
});
