import {
  I18nManager,
  type StyleProp,
  StyleSheet,
  type TextStyle,
} from 'react-native';
import { act, fireEvent, screen } from '@testing-library/react-native';
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

describe('Question cards (US-03-01)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    deviceLocale('pl_PL');
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.mocked(I18nManager.getConstants).mockRestore();
  });

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

  it('after the last card the deck starts over, until US-03-02/03 (DEC-53)', async () => {
    await openCards();
    for (let i = 0; i < 4; i++) await touch();

    expect(screen.getByTestId('card-0')).toBeOnTheScreen();
  });

  it('a category the content does not hold shows nothing', async () => {
    await renderRouter(routes, { initialUrl: '/cards/9' });

    expect(screen.queryByTestId('card-screen')).toBeNull();
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
