import type { Deck } from '../content';
import { markSeen, openDeck, restore, shuffle } from '../progress';

const mockSaved = new Map<string, string>();
jest.mock('../storage', () => ({
  load: (key: string) => {
    const value = mockSaved.get(key);
    return value === undefined ? undefined : JSON.parse(value);
  },
  save: (key: string, value: unknown) =>
    mockSaved.set(key, JSON.stringify(value)),
}));

const ids = (count: number, prefix = 'q') =>
  Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);

const deckOf = (questionIds: string[], category = '3+') =>
  ({
    schemaVersion: 1,
    category,
    questions: questionIds.map(id => ({
      id,
      kind: 'trivia',
      pl: { question: `${id}?`, answer: `${id}.` },
      en: { question: `${id}?`, answer: `${id}.` },
    })),
  }) as Deck;

const savedDeck = (category = '3+') => {
  const value = mockSaved.get(`deck-${category}`);
  return value === undefined ? undefined : JSON.parse(value);
};

beforeEach(() => mockSaved.clear());
afterEach(() => jest.restoreAllMocks());

describe('shuffle', () => {
  it('returns every item once, in a new array', () => {
    const items = ids(50);
    const shuffled = shuffle(items);

    expect(shuffled).not.toBe(items);
    expect([...shuffled].sort()).toEqual([...items].sort());
    expect(items).toEqual(ids(50));
  });

  it('orders the items by chance', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);

    expect(shuffle(['a', 'b', 'c'])).toEqual(['b', 'c', 'a']);
  });
});

describe('restore — a saved deck against the questions as they are now', () => {
  it.each([
    ['nothing saved', undefined],
    ['null', null],
    ['a string', 'not a deck'],
    ['an empty object', {}],
    ['an order that is not a list', { order: 'q1', seen: 0 }],
    ['an id that is not a string', { order: ['q1', 2], seen: 0 }],
    ['a repeated id', { order: ['q1', 'q1'], seen: 0 }],
    ['no position', { order: ['q1', 'q2'] }],
    ['a negative position', { order: ['q1', 'q2'], seen: -1 }],
    ['a position past the end', { order: ['q1', 'q2'], seen: 3 }],
    ['a fractional position', { order: ['q1', 'q2'], seen: 0.5 }],
  ])('is unreadable when the saved value is %s', (_, saved) => {
    expect(restore(saved, ['q1', 'q2'])).toBeUndefined();
  });

  it('keeps the saved order and position when the deck has not changed', () => {
    const saved = { order: ['q3', 'q1', 'q2'], seen: 1 };

    expect(restore(saved, ['q1', 'q2', 'q3'])).toEqual(saved);
  });

  it('skips questions no longer in the deck, seen or not (Q37)', () => {
    const saved = { order: ['q3', 'q1', 'q4', 'q2'], seen: 2 };

    expect(restore(saved, ['q2', 'q3', 'q4'])).toEqual({
      order: ['q3', 'q4', 'q2'],
      seen: 1,
    });
  });

  it('puts new questions among the unseen ones, keeping their saved order (Q37)', () => {
    const saved = { order: ['q1', 'q2', 'q3', 'q4'], seen: 2 };
    const restored = restore(saved, [...ids(4), 'q5', 'q6'])!;

    expect(restored.seen).toBe(2);
    expect(restored.order.slice(0, 2)).toEqual(['q1', 'q2']);
    expect([...restored.order.slice(2)].sort()).toEqual([
      'q3',
      'q4',
      'q5',
      'q6',
    ]);
    expect(restored.order.filter(id => id === 'q3' || id === 'q4')).toEqual([
      'q3',
      'q4',
    ]);
  });

  it('places a new question at random among the unseen ones', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const saved = { order: ['q1', 'q2', 'q3'], seen: 1 };

    expect(restore(saved, ['q1', 'q2', 'q3', 'q4'])).toEqual({
      order: ['q1', 'q4', 'q2', 'q3'],
      seen: 1,
    });
  });
});

describe('openDeck and markSeen — the deck kept on the device (MOD-03-F06…F08)', () => {
  it('shuffles a deck opened for the first time and saves it at its first card', () => {
    const progress = openDeck(deckOf(ids(50)));

    expect(progress.seen).toBe(0);
    expect([...progress.order].sort()).toEqual([...ids(50)].sort());
    expect(savedDeck()).toEqual(progress);
  });

  it('opens a deck where it was left', () => {
    const deck = deckOf(ids(50));
    const first = markSeen('3+', openDeck(deck));

    expect(openDeck(deck)).toEqual(first);
  });

  it('a revealed card is saved as seen at once (MOD-03-F07)', () => {
    const progress = openDeck(deckOf(ids(3)));
    const seen = markSeen('3+', progress);

    expect(seen).toEqual({ ...progress, seen: 1 });
    expect(savedDeck()).toEqual(seen);
  });

  it('shows each of 50 questions exactly once (US-03-02#1)', () => {
    const deck = deckOf(ids(50));
    const shown: string[] = [];
    let progress = openDeck(deck);
    for (let i = 0; i < 50; i++) {
      // Closed and opened again between the cards: the deck goes on where it was.
      progress = openDeck(deck);
      shown.push(progress.order[progress.seen]);
      progress = markSeen('3+', progress);
    }

    expect(new Set(shown).size).toBe(50);
    expect([...shown].sort()).toEqual([...ids(50)].sort());
  });

  it('keeps each category apart (US-03-02#4)', () => {
    const three = deckOf(ids(5, 'a'), '3+');
    const four = deckOf(ids(5, 'b'), '4+');
    const threeSeen = markSeen('3+', markSeen('3+', openDeck(three)));

    expect(openDeck(four).seen).toBe(0);
    expect(openDeck(three)).toEqual(threeSeen);
  });

  it('starts a fresh shuffle when the saved deck is unreadable (MOD-03-F08)', () => {
    mockSaved.set('deck-3+', JSON.stringify({ order: 'broken' }));
    const progress = openDeck(deckOf(ids(5)));

    expect(progress.seen).toBe(0);
    expect([...progress.order].sort()).toEqual([...ids(5)].sort());
    expect(savedDeck()).toEqual(progress);
  });

  it('starts a new shuffle once every card has been seen, until US-03-03 (DEC-55)', () => {
    mockSaved.set('deck-3+', JSON.stringify({ order: ids(3), seen: 3 }));

    expect(openDeck(deckOf(ids(3))).seen).toBe(0);
  });
});
