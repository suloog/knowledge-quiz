import {
  I18nManager,
  type StyleProp,
  StyleSheet,
  type TextStyle,
} from 'react-native';
import { act, fireEvent, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import { renderRouter } from 'expo-router/testing-library';
import { hostNodes } from '../../../tests/unit/support/app-tree';
import RootLayout from '../_layout';
import CardScreen, { TOUCH_GUARD_MS, cardType } from '../cards/[category]';
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
        {
          id: 'q2',
          pl: { question: 'Pytanie drugie?', answer: 'Odpowiedź druga.' },
          en: { question: 'Second question?', answer: 'Second answer.' },
        },
      ],
    },
    {
      category: '4+',
      questions: [
        {
          id: 'q3',
          pl: { question: 'Pytanie z 4+?', answer: 'Odpowiedź z 4+.' },
          en: { question: 'A 4+ question?', answer: 'A 4+ answer.' },
        },
      ],
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

// Math.random() just below 1 leaves a shuffled deck in its data order; 0 reverses two cards.
const shuffleKeepsOrder = () =>
  jest.spyOn(Math, 'random').mockReturnValue(0.999);
const shuffleSwapsTwo = () => jest.spyOn(Math, 'random').mockReturnValue(0);

const deviceLocale = (localeIdentifier: string) =>
  jest.spyOn(I18nManager, 'getConstants').mockReturnValue({
    isRTL: false,
    doLeftAndRightSwapInRTL: true,
    localeIdentifier,
  });

const routes = {
  _layout: RootLayout,
  index: CategoriesScreen,
  'cards/[category]': CardScreen,
};

// Choose the category on the category screen; its first card is drawn, then the guard runs out.
const openCards = async (category = '3+') => {
  await renderRouter(routes);
  await fireEvent.press(screen.getByText(category));
  await act(async () => {
    jest.advanceTimersByTime(TOUCH_GUARD_MS + 100);
  });
};

// A touch, then as long as the child waits before the next one.
const touch = async (wait = TOUCH_GUARD_MS + 100) => {
  await fireEvent(screen.getByTestId(/^card-\d+$/), 'pressIn');
  await act(async () => {
    jest.advanceTimersByTime(wait);
  });
};

// Every text the app draws — the category screen stays below the card in the stack — and the
// card screen's own.
type Tree = Parameters<typeof hostNodes>[0];
const subtree = (tree: Tree, testID: string): Tree => {
  if (!tree) return null;
  if (tree.props.testID === testID) return tree;
  for (const child of tree.children)
    if (typeof child !== 'string') {
      const found = subtree(child, testID);
      if (found) return found;
    }
  return null;
};
const texts = (tree: Tree) =>
  hostNodes(tree).filter(node => node.type === 'Text');
const fontSizes = () =>
  texts(screen.toJSON() as Tree).map(
    node =>
      StyleSheet.flatten(node.props.style as StyleProp<TextStyle>)
        .fontSize as number,
  );

const cardSetUp = () => {
  beforeEach(() => {
    jest.useFakeTimers();
    deviceLocale('pl_PL');
    mockSaved.clear();
    shuffleKeepsOrder();
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
};

describe('Question cards (US-03-01)', () => {
  cardSetUp();

  it('choosing a category opens its first card (MOD-02-F04)', async () => {
    await renderRouter(routes);
    await fireEvent.press(screen.getByText('4+'));

    expect(await screen.findByTestId('card-screen')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie z 4+?');
  });

  it('a new card shows its question alone, in the largest type of the app (#1)', async () => {
    await openCards();

    expect(screen.getByTestId('question')).toHaveTextContent(
      'Pytanie pierwsze?',
    );
    expect(screen.getByTestId('question')).toHaveStyle({
      fontSize: Math.max(...fontSizes()),
    });
    expect(texts(subtree(screen.toJSON() as Tree, 'card-screen'))).toHaveLength(
      1,
    );
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(screen.queryByTestId('rule')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('a touch reveals the answer below a rule; the question stays (#2)', async () => {
    await openCards();
    await touch();

    expect(screen.getByTestId('question')).toHaveTextContent(
      'Pytanie pierwsze?',
    );
    expect(screen.getByTestId('rule')).toBeOnTheScreen();
    expect(screen.getByTestId('answer')).toHaveTextContent(
      'Odpowiedź pierwsza.',
    );
  });

  it('the next touch shows the next question alone (#3)', async () => {
    await openCards();
    await touch();
    await touch();

    expect(screen.getByTestId('card-1')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(screen.queryByTestId('rule')).toBeNull();
  });

  it('two touches within 0.5 s reveal the answer and skip nothing (#4)', async () => {
    await openCards();
    await touch(200);
    await touch();

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('answer')).toHaveTextContent(
      'Odpowiedź pierwsza.',
    );
  });

  it('a touch before the new card has been shown for 0.5 s is ignored (MOD-03-F14)', async () => {
    await renderRouter(routes);
    await fireEvent.press(screen.getByText('3+'));
    await act(async () => {
      jest.advanceTimersByTime(TOUCH_GUARD_MS - 100);
    });
    await touch();

    expect(screen.queryByTestId('answer')).toBeNull();
  });

  it.each([
    ['pl_PL', 'Pytanie pierwsze?', 'Odpowiedź pierwsza.'],
    ['en_US', 'First question?', 'First answer.'],
  ])(
    'on a device set to %p the card is in that language (#5, DEC-52)',
    async (locale, question, answer) => {
      deviceLocale(locale);
      await openCards();
      await touch();

      expect(screen.getByTestId('question')).toHaveTextContent(question);
      expect(screen.getByTestId('answer')).toHaveTextContent(answer);
    },
  );

  it('a category the content does not hold shows nothing', async () => {
    await renderRouter(routes, { initialUrl: '/cards/9' });

    expect(screen.queryByTestId('card-screen')).toBeNull();
  });
});

// The app closed fully and opened again: everything drawn is gone, only what was saved is left.
const restartApp = async () => {
  await act(async () => screen.unmount());
};

describe('Deck without repeats, resumed where it was left (US-03-02)', () => {
  cardSetUp();

  it('shows each question of the category once (#1)', async () => {
    await openCards();
    const shown = [screen.getByTestId('question').props.children];
    await touch();
    await touch();
    shown.push(screen.getByTestId('question').props.children);

    expect(shown.sort()).toEqual(['Pytanie drugie?', 'Pytanie pierwsze?']);
  });

  it('closed before the reveal, the same question comes back, answer hidden (#2)', async () => {
    shuffleSwapsTwo();
    await openCards();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    await restartApp();

    shuffleKeepsOrder();
    await openCards();

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    expect(screen.queryByTestId('answer')).toBeNull();
  });

  it('closed after the reveal, the next unseen question comes, answer hidden (#3)', async () => {
    await openCards();
    await touch();
    await restartApp();

    await openCards();

    expect(screen.getByTestId('card-1')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    expect(screen.queryByTestId('answer')).toBeNull();
  });

  it('each category keeps its own position (#4)', async () => {
    await openCards('3+');
    await touch();
    await act(async () => router.back());
    await fireEvent.press(screen.getByText('4+'));

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie z 4+?');

    await act(async () => router.back());
    await fireEvent.press(screen.getByText('3+'));

    expect(screen.getByTestId('card-1')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
  });

  it('an unreadable saved deck starts a fresh shuffle, without an error (MOD-03-F08)', async () => {
    mockSaved.set('deck-3+', '"unreadable"');
    await openCards();

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent(
      'Pytanie pierwsze?',
    );
    expect(JSON.parse(mockSaved.get('deck-3+')!)).toEqual({
      order: ['q1', 'q2'],
      seen: 0,
    });
  });

  it('after the last card a new shuffle starts, until US-03-03 (DEC-55)', async () => {
    await openCards();
    for (let i = 0; i < 4; i++) await touch();

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(JSON.parse(mockSaved.get('deck-3+')!)).toEqual({
      order: ['q1', 'q2'],
      seen: 0,
    });
  });
});

describe('cardType — the largest type, unless the longest word would not fit a line (DEC-53)', () => {
  it("sets a text of short words in the app's largest type", () => {
    expect(cardType('Ile dni ma jeden tydzień?', 411)).toBe(64);
  });

  it('sets a text with a long word smaller, so the word fits one line of the card', () => {
    const size = cardType(
      'Jakim słowem nazywamy dzień przed dzisiejszym?',
      411,
    );

    expect(size).toBeLessThan(64);
    expect('dzisiejszym?'.length * size * 0.6).toBeLessThanOrEqual(411 - 48);
  });

  it('sets the same text smaller on a narrower screen', () => {
    expect(cardType('Wczoraj.', 200)).toBeLessThan(cardType('Wczoraj.', 411));
  });
});
