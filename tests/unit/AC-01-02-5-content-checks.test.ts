// US-01-02#5 — all automatic content checks pass, and breaking any one of them fails the suite.
import { decks } from '../../src/content';
import { checkDeck, checkDecks } from '../../src/content/checks';
import type { Deck } from '../../src/content/deck';

const threePlus = decks.find(deck => deck.category === '3+')!;
const copy = (): Deck => JSON.parse(JSON.stringify(threePlus));
const broken = (change: (deck: Deck) => void) => {
  const deck = copy();
  change(deck);
  return checkDeck(deck);
};

describe('AC-01-02-5 All automatic content checks pass; breaking any one fails the suite', () => {
  it('step 1 — every deck the app ships passes every content check', () => {
    expect(checkDecks(decks)).toEqual([]);
  });

  it.each<[string, (deck: Deck) => void]>([
    ['a question fewer than 50', deck => void deck.questions.pop()],
    [
      'a question more than 50',
      deck => void deck.questions.push({ ...deck.questions[0], id: 'extra' }),
    ],
    [
      'a missing English answer',
      deck =>
        void delete (
          deck.questions[0].en as Partial<Deck['questions'][0]['en']>
        ).answer,
    ],
    [
      'an empty Polish answer',
      deck => void (deck.questions[0].pl.answer = ' '),
    ],
    [
      'two answers instead of one',
      deck =>
        void ((deck.questions[0].pl as unknown as { answer: string[] }).answer =
          ['a', 'b']),
    ],
    [
      'a missing Polish question',
      deck =>
        void delete (deck.questions[0] as Partial<Deck['questions'][0]>).pl,
    ],
    [
      'a question of 101 characters',
      deck => void (deck.questions[0].en.question = 'x'.repeat(101)),
    ],
    [
      'an answer of 61 characters',
      deck => void (deck.questions[0].pl.answer = 'x'.repeat(61)),
    ],
    [
      'a kind with fewer than 5 questions',
      deck =>
        deck.questions
          .filter(q => q.kind === 'trivia')
          .slice(0, -4)
          .forEach(q => (q.kind = 'nature')),
    ],
    [
      'an unknown kind',
      deck => void ((deck.questions[0] as { kind: string }).kind = 'history'),
    ],
    ['a question without an id', deck => void (deck.questions[0].id = '')],
    [
      'an illustration that is not a file name',
      deck => void (deck.questions[0].illustration = ''),
    ],
    [
      'a wrong schema version',
      deck => void ((deck as { schemaVersion: number }).schemaVersion = 2),
    ],
  ])('step 2 — %s fails the content checks', (_, change) => {
    expect(broken(change)).not.toEqual([]);
  });

  it('step 3 — a question id, a question text or a category used twice fails the content checks', () => {
    const duplicateId = copy();
    duplicateId.questions[1].id = duplicateId.questions[0].id;
    expect(checkDecks([duplicateId])).toEqual([
      `question id ${duplicateId.questions[0].id} appears more than once`,
    ]);

    const duplicateText = copy();
    duplicateText.questions[1].en.question =
      duplicateText.questions[0].en.question;
    expect(checkDecks([duplicateText])).toEqual([
      `en question "${duplicateText.questions[0].en.question.toLowerCase()}" appears more than once`,
    ]);

    const duplicatePl = copy();
    duplicatePl.questions[1].pl.question = ` ${duplicatePl.questions[0].pl.question.toUpperCase()} `;
    expect(checkDecks([duplicatePl])).toEqual([
      `pl question "${duplicatePl.questions[0].pl.question.toLowerCase()}" appears more than once`,
    ]);

    // Another category, its own ids and texts, but one Polish text taken from 3+.
    const sharedText = copy();
    sharedText.category = 'other';
    sharedText.questions.forEach((q, i) => {
      q.id = `other-${i}`;
      q.pl.question = `inne pytanie ${i}`;
      q.en.question = `another question ${i}`;
    });
    sharedText.questions[7].pl.question = threePlus.questions[3].pl.question;
    expect(checkDecks([threePlus, sharedText])).toEqual([
      `pl question "${threePlus.questions[3].pl.question.toLowerCase()}" appears more than once`,
    ]);

    // The same category twice, with its own ids and texts: only the category is reported.
    const sameCategory = copy();
    sameCategory.questions.forEach((q, i) => {
      q.id = `other-${i}`;
      q.pl.question = `inne pytanie ${i}`;
      q.en.question = `another question ${i}`;
    });
    expect(checkDecks([threePlus, sameCategory])).toEqual([
      'category 3+ appears in more than one deck',
    ]);

    // A missing text is reported once, as missing — never as a duplicate "undefined".
    const missingText = copy();
    delete (missingText.questions[0] as Partial<Deck['questions'][0]>).en;
    delete (missingText.questions[1] as Partial<Deck['questions'][0]>).en;
    expect(
      checkDecks([missingText]).filter(problem => problem.includes('appears')),
    ).toEqual([]);
  });

  it('step 4 — a question with an illustration file name passes', () => {
    expect(
      broken(deck => (deck.questions[0].illustration = 'sun.png')),
    ).toEqual([]);
  });
});
