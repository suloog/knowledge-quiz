import {
  I18nManager,
  Image,
  PixelRatio,
  type StyleProp,
  StyleSheet,
  type TextStyle,
} from 'react-native';
import { illustrations } from '@/content';
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
          illustration: 'hand.png',
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

// A category's entry in the list — once a category was opened, the continue entry above the list
// names it too (US-02-02).
const listEntry = (category: string) =>
  screen
    .getAllByTestId(/^category-\d+$/)
    .find(entry => entry.props.children === category)!;

// Choose the category on the category screen; its first card is drawn, then the guard runs out.
const openCards = async (category = '3+') => {
  await renderRouter(routes);
  await fireEvent.press(listEntry(category));
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
    await fireEvent.press(listEntry('4+'));

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
    // The card itself; the return control sits above it, outside it (US-03-04).
    const cardTree = subtree(screen.toJSON() as Tree, 'card-0');
    expect(texts(cardTree)).toHaveLength(1);
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(screen.queryByTestId('rule')).toBeNull();
    expect(
      hostNodes(cardTree).filter(node => node.props.role === 'button'),
    ).toHaveLength(0);
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
    await fireEvent.press(listEntry('3+'));
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
    await fireEvent.press(listEntry('4+'));

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie z 4+?');

    await act(async () => router.back());
    await fireEvent.press(listEntry('3+'));

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
});

// The child waits out the guard, then touches one of the end card's choices.
const choose = async (testID: string, wait = TOUCH_GUARD_MS + 100) => {
  await fireEvent(screen.getByTestId(testID), 'pressIn');
  await act(async () => {
    jest.advanceTimersByTime(wait);
  });
};

describe('End of the deck (US-03-03)', () => {
  cardSetUp();

  // The 3+ deck of two cards: both answers revealed, the last one touched again.
  const finishDeck = async () => {
    await openCards();
    for (let i = 0; i < 4; i++) await touch();
  };

  it('after the last answer the next touch shows the end card with "again" and "categories" (#1)', async () => {
    await finishDeck();

    expect(screen.getByTestId('end-card')).toBeOnTheScreen();
    expect(screen.getByTestId('deck-finished')).toHaveTextContent(
      'Talia skończona',
    );
    expect(screen.getByTestId('again')).toHaveTextContent('Jeszcze raz');
    expect(screen.getByTestId('categories')).toHaveTextContent('Kategorie');
    expect(screen.queryByTestId('question')).toBeNull();
    expect(JSON.parse(mockSaved.get('deck-3+')!)).toEqual({
      order: ['q1', 'q2'],
      seen: 2,
    });
  });

  it('the last answer stays until it is touched again (#1)', async () => {
    await openCards();
    for (let i = 0; i < 3; i++) await touch();

    expect(screen.getByTestId('card-1')).toBeOnTheScreen();
    expect(screen.getByTestId('answer')).toHaveTextContent('Odpowiedź druga.');
    expect(screen.queryByTestId('end-card')).toBeNull();
  });

  it('on a device set to English the end card is in English (DEC-52, DEC-57)', async () => {
    deviceLocale('en_US');
    await finishDeck();

    expect(screen.getByTestId('deck-finished')).toHaveTextContent(
      'The deck is finished',
    );
    expect(screen.getByTestId('again')).toHaveTextContent('Again');
    expect(screen.getByTestId('categories')).toHaveTextContent('Categories');
  });

  it('"again" starts the category over in a new shuffled order, every card unseen (#2)', async () => {
    await finishDeck();
    shuffleSwapsTwo();
    await choose('again');

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(JSON.parse(mockSaved.get('deck-3+')!)).toEqual({
      order: ['q2', 'q1'],
      seen: 0,
    });
  });

  it('"categories" shows the category screen, with no second one stacked (#3)', async () => {
    await finishDeck();
    await choose('categories');

    expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
    expect(screen.queryByTestId('end-card')).toBeNull();
    expect(router.canGoBack()).toBe(false);
  });

  it('a touch on a choice before the end card has been shown for 0.5 s is ignored (MOD-03-F14)', async () => {
    await openCards();
    for (let i = 0; i < 3; i++) await touch();
    await touch(200);
    await choose('again');

    expect(screen.getByTestId('end-card')).toBeOnTheScreen();
    expect(JSON.parse(mockSaved.get('deck-3+')!).seen).toBe(2);
  });

  it('closed on the end card, the category opens on its end card again (edge case, MOD-03-F09)', async () => {
    await finishDeck();
    await restartApp();

    await openCards();

    expect(screen.getByTestId('end-card')).toBeOnTheScreen();
    expect(screen.queryByTestId('question')).toBeNull();
  });
});

describe('Back to the categories from any card (US-03-04)', () => {
  cardSetUp();

  const saved = () => JSON.parse(mockSaved.get('deck-3+')!);

  it("Android's back action shows the category screen (#1)", async () => {
    await openCards();
    await act(async () => router.back());

    expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
    expect(screen.queryByTestId('card-screen')).toBeNull();
  });

  it('every card shows a small control outside the card, in the app language (#2)', async () => {
    await openCards();
    const tree = screen.toJSON() as Tree;

    expect(screen.getByTestId('return-control')).toHaveTextContent(
      '‹ Kategorie',
    );
    expect(screen.getByLabelText('Wróć do kategorii')).toBeOnTheScreen();
    expect(subtree(subtree(tree, 'card-0'), 'return-control')).toBeNull();
    expect(subtree(tree, 'return-control')).not.toBeNull();

    await touch();
    expect(screen.getByTestId('return-control')).toBeOnTheScreen();
    await touch();
    expect(screen.getByTestId('card-1')).toBeOnTheScreen();
    expect(screen.getByTestId('return-control')).toBeOnTheScreen();
  });

  it('on a device set to English the control is in English (DEC-52, DEC-57)', async () => {
    deviceLocale('en_US');
    await openCards();

    expect(screen.getByTestId('return-control')).toHaveTextContent(
      '‹ Categories',
    );
    expect(screen.getByLabelText('Back to categories')).toBeOnTheScreen();
  });

  it('the control shows the category screen, with no second one stacked (#2)', async () => {
    await openCards();
    await choose('return-control');

    expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
    expect(screen.queryByTestId('card-screen')).toBeNull();
    expect(router.canGoBack()).toBe(false);
  });

  it('touching the control never reveals an answer or moves on: the deck is unchanged (#3)', async () => {
    await openCards();
    const before = saved();
    await choose('return-control');

    expect(saved()).toEqual(before);
    expect(screen.queryByTestId('answer')).toBeNull();

    await fireEvent.press(listEntry('3+'));
    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent(
      'Pytanie pierwsze?',
    );
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(saved()).toEqual(before);
  });

  it('touching the control on a revealed answer does not move on to the next card (#3)', async () => {
    await openCards();
    await touch();
    const before = saved();
    await choose('return-control');

    expect(saved()).toEqual(before);
    expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
  });

  it('a touch on the control before the card has been shown for 0.5 s is ignored (MOD-03-F14)', async () => {
    await openCards();
    await touch(200);
    await choose('return-control');

    expect(screen.getByTestId('card-screen')).toBeOnTheScreen();
  });

  it('after returning, the category resumes where it was left (#4)', async () => {
    await openCards();
    await touch();
    await act(async () => router.back());
    await fireEvent.press(listEntry('3+'));

    expect(screen.getByTestId('card-1')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    expect(screen.queryByTestId('answer')).toBeNull();
  });

  it('back while the answer is hidden: that card is not counted as seen (edge case, DEC-38)', async () => {
    await openCards();
    await act(async () => router.back());

    expect(saved().seen).toBe(0);

    await fireEvent.press(listEntry('3+'));
    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.getByTestId('question')).toHaveTextContent(
      'Pytanie pierwsze?',
    );
    expect(screen.queryByTestId('answer')).toBeNull();
  });

  it('a fast double touch on a category opens its cards once (DEC-58)', async () => {
    await renderRouter(routes);
    // The second touch reaches the entry the first one already acted on.
    const entry = listEntry('3+');
    await fireEvent.press(entry);
    await fireEvent.press(entry);
    await act(async () => router.back());

    expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
    expect(router.canGoBack()).toBe(false);
  });
});

describe('Illustrations (US-03-05)', () => {
  cardSetUp();

  it('a question without an illustration shows no picture and keeps no place for one (#1)', async () => {
    await openCards();

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
    expect(screen.queryByTestId('illustration')).toBeNull();
    expect(
      hostNodes(screen.toJSON() as Tree).filter(node => node.type === 'Image'),
    ).toHaveLength(0);
  });

  it('an illustration shows with its question as the card appears, and stays after the reveal (#3)', async () => {
    await openCards();
    await touch();
    await touch();

    expect(screen.getByTestId('question')).toHaveTextContent('Pytanie drugie?');
    expect(screen.queryByTestId('answer')).toBeNull();
    expect(screen.getByTestId('illustration')).toHaveProp(
      'source',
      illustrations['hand.png'],
    );

    await touch();

    expect(screen.getByTestId('answer')).toHaveTextContent('Odpowiedź druga.');
    expect(screen.getByTestId('illustration')).toHaveProp(
      'source',
      illustrations['hand.png'],
    );
  });

  it('the same question shows the same illustration in English (#4)', async () => {
    deviceLocale('en_US');
    await openCards();
    await touch();
    await touch();

    expect(screen.getByTestId('question')).toHaveTextContent(
      'Second question?',
    );
    expect(screen.getByTestId('illustration')).toHaveProp(
      'source',
      illustrations['hand.png'],
    );
  });

  it('an illustration is drawn one image pixel to one screen pixel, so it gains no greys (NFR-07)', async () => {
    jest
      .spyOn(Image, 'resolveAssetSource')
      .mockReturnValue({ uri: 'hand.png', width: 180, height: 180, scale: 1 });
    jest.spyOn(PixelRatio, 'get').mockReturnValue(2.5);
    await openCards();
    await touch();
    await touch();

    expect(screen.getByTestId('illustration')).toHaveStyle({
      width: 72,
      height: 72,
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
