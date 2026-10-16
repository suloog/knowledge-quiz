import { I18nManager, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { act, fireEvent, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import { renderRouter } from 'expo-router/testing-library';
import RootLayout from '../_layout';
import CardScreen, { TOUCH_GUARD_MS } from '../cards/[category]';
import CategoriesScreen from '../index';

jest.mock('@/content/decks', () => ({
  decks: [
    {
      category: '3+',
      questions: [
        {
          id: 'q1',
          pl: { question: 'Pytanie pierwsze?', answer: 'Odpowiedź pierwsza.' },
          en: { question: 'First question?', answer: 'First answer.' },
        },
      ],
    },
    {
      category: '4+',
      questions: ['q2', 'q3', 'q4', 'q5'].map(id => ({
        id,
        pl: { question: `Pytanie ${id}?`, answer: `Odpowiedź ${id}.` },
        en: { question: `Question ${id}?`, answer: `Answer ${id}.` },
      })),
    },
    {
      category: '5+',
      questions: [
        {
          id: 'q6',
          pl: { question: 'Pytanie z 5+?', answer: 'Odpowiedź z 5+.' },
          en: { question: 'A 5+ question?', answer: 'A 5+ answer.' },
        },
      ],
    },
  ],
}));

// What the app keeps on the device, in memory: key → JSON, or anything else for an unreadable file.
const mockSaved = new Map<string, string>();
jest.mock('@/storage', () => ({
  load: (key: string) => {
    const value = mockSaved.get(key);
    try {
      return value === undefined ? undefined : JSON.parse(value);
    } catch {
      return undefined;
    }
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
const choose = async (category: string) => {
  await fireEvent.press(screen.getByText(category));
  await wait();
};
const touch = async () => {
  await fireEvent(screen.getByTestId(/^card-\d+$/), 'pressIn');
  await wait();
};
const backToCategories = async () => {
  await act(async () => router.back());
};
// The app closed and opened again: a fresh start on what is saved.
const restart = async () => {
  await act(async () => screen.unmount());
  await renderRouter(routes);
};
const listOrder = () =>
  [0, 1, 2].map(i => screen.getByTestId(`category-${i}`).props.children);
// The test ids on screen, in the order they are drawn: top to bottom.
const drawOrder = () => {
  const ids: string[] = [];
  const walk = (node: ReturnType<typeof screen.toJSON> | string) => {
    if (!node || typeof node === 'string') return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (typeof node.props.testID === 'string') ids.push(node.props.testID);
    node.children?.forEach(walk);
  };
  walk(screen.toJSON());
  return ids;
};
// The continue entry as it is drawn: its two lines, and the type each is set in.
const continueLines = () =>
  ['continue', 'continue-category'].map(id => {
    const line = screen.getByTestId(id);
    return {
      text: line.props.children,
      fontSize: StyleSheet.flatten(line.props.style).fontSize,
    };
  });

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

describe('Continue the last-used category (US-02-02)', () => {
  it('on first launch there is no continue entry, only the list (#1, MOD-02-F08)', async () => {
    await renderRouter(routes);

    expect(screen.queryByTestId('continue-entry')).toBeNull();
    expect(listOrder()).toEqual(['3+', '4+', '5+']);
  });

  it('after 4+ was opened, a continue entry for 4+ stands above the unchanged list, inverted (#2, MOD-02-U02)', async () => {
    await renderRouter(routes);
    await choose('4+');
    await backToCategories();

    // "Kontynuuj" and "4+" on lines of their own, each at the largest type its screen's width allows
    // (DEC-53), never shrunk to one line: on one line, Android drew only "Kontynuuj".
    expect(continueLines()).toEqual([
      { text: 'Kontynuuj', fontSize: 64 },
      { text: '4+', fontSize: 64 },
    ]);
    expect(screen.getByTestId('continue').props.numberOfLines).toBeUndefined();
    expect(listOrder()).toEqual(['3+', '4+', '5+']);
    const order = drawOrder();
    expect(order.indexOf('continue-entry')).toBeGreaterThanOrEqual(0);
    expect(order.indexOf('continue-category')).toBeLessThan(
      order.indexOf('category-0'),
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('continue-entry').props.style),
    ).toMatchObject({ backgroundColor: colors.ink });
    for (const id of ['continue', 'continue-category'])
      expect(
        StyleSheet.flatten(screen.getByTestId(id).props.style),
      ).toMatchObject({ color: colors.paper });
  });

  it('names the last category opened, in English on a device set to English', async () => {
    jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
      isRTL: false,
      doLeftAndRightSwapInRTL: true,
      localeIdentifier: 'en_US',
    });
    await renderRouter(routes);
    await choose('4+');
    await backToCategories();
    await choose('5+');
    await backToCategories();

    expect(screen.getByTestId('continue')).toHaveTextContent('Continue');
    expect(screen.getByTestId('continue-category')).toHaveTextContent('5+');
  });

  it('follows the language switch: "Kontynuuj" becomes "Continue", in its text and its label (US-02-03#3, MOD-02-F10)', async () => {
    mockSaved.set('last-category', JSON.stringify('3+'));
    await renderRouter(routes);
    expect(screen.getByTestId('continue')).toHaveTextContent('Kontynuuj');

    await fireEvent.press(screen.getByTestId('language-en'));

    expect(screen.getByTestId('continue')).toHaveTextContent('Continue');
    expect(screen.getByTestId('continue-category')).toHaveTextContent('3+');
    expect(screen.getByTestId('continue-entry').props.accessibilityLabel).toBe(
      'Continue 3+',
    );
  });

  it('after a restart, continue opens 4+ at its fourth card when three answers were revealed (#3, MOD-02-F06, F07)', async () => {
    await renderRouter(routes);
    await choose('4+');
    for (let i = 0; i < 5; i++) await touch();
    expect(screen.getByTestId('answer')).toHaveTextContent('Odpowiedź q4.');

    await restart();

    expect(screen.getByTestId('continue-category')).toHaveTextContent('4+');
    await fireEvent.press(screen.getByTestId('continue-entry'));
    expect(await screen.findByTestId('card-3')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie q5?');
    expect(screen.queryByTestId('answer')).toBeNull();
  });

  it("continue on a finished deck shows that category's end card (#4, MOD-02-F09)", async () => {
    mockSaved.set('deck-3+', JSON.stringify({ order: ['q1'], seen: 1 }));
    mockSaved.set('last-category', JSON.stringify('3+'));
    await renderRouter(routes);

    await fireEvent.press(screen.getByTestId('continue-entry'));

    expect(await screen.findByTestId('end-card')).toBeOnTheScreen();
  });

  it.each([
    ['unreadable', '{"last'],
    ['not a category', JSON.stringify('7+')],
    ['not a name', JSON.stringify({ category: '3+' })],
  ])(
    'saved data that is %s shows no continue entry, as on first launch (edge case, MOD-02-F08)',
    async (_, saved) => {
      mockSaved.set('last-category', saved);
      await renderRouter(routes);

      expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
      expect(screen.queryByTestId('continue-entry')).toBeNull();
    },
  );
});
