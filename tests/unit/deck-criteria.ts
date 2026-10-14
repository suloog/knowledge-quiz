// The acceptance criteria every age category's deck story shares (US-01-02, US-01-03, US-01-04):
// each story's AC-NN-MM-n test calls one of these with its own id and its category, so every deck
// is held to the same checks. Not a test file itself.
import { decks } from '../../src/content';
import { checkDeck, checkDecks } from '../../src/content/checks';
import { CONTENT_KINDS, type Deck } from '../../src/content/deck';

const deckOf = (category: string) =>
  decks.find(deck => deck.category === category);

// #1 — the category holds exactly 50 questions, each with exactly one answer, in Polish and English.
export const describeFiftyQuestions = (ac: string, category: string) => {
  const deck = deckOf(category);

  describe(`${ac} The ${category} category holds 50 questions, each with one answer in Polish and English`, () => {
    it(`step 1 — the ${category} deck ships with the app`, () => {
      expect(deck).toBeDefined();
    });

    it('step 2 — it holds exactly 50 questions', () => {
      expect(deck?.questions).toHaveLength(50);
    });

    it.each(['pl', 'en'] as const)(
      'step 3 — every question has its question and exactly one answer in %s',
      language => {
        deck?.questions.forEach(question => {
          expect(typeof question[language].question).toBe('string');
          expect(question[language].question.trim()).not.toBe('');
          expect(typeof question[language].answer).toBe('string');
          expect(question[language].answer.trim()).not.toBe('');
        });
      },
    );
  });
};

// #2 — every question is at most 100 characters and every answer at most 60, in each language
// (DEC-39).
export const describeLengthLimits = (ac: string, category: string) => {
  const deck = deckOf(category)!;

  describe(`${ac} Every ${category} question is at most 100 characters and every answer at most 60`, () => {
    it.each(['pl', 'en'] as const)(
      'step 1 — no %s question is longer than 100 characters',
      language => {
        const tooLong = deck.questions.filter(
          q => q[language].question.length > 100,
        );
        expect(tooLong.map(q => q.id)).toEqual([]);
      },
    );

    it.each(['pl', 'en'] as const)(
      'step 2 — no %s answer is longer than 60 characters',
      language => {
        const tooLong = deck.questions.filter(
          q => q[language].answer.length > 60,
        );
        expect(tooLong.map(q => q.id)).toEqual([]);
      },
    );
  });
};

// #3 — each of the four kinds of content appears at least 5 times among the 50 questions (Q30).
export const describeFourKinds = (ac: string, category: string) => {
  const deck = deckOf(category)!;

  describe(`${ac} Each kind of content appears at least 5 times in the ${category} deck`, () => {
    it('step 1 — every question is one of the four kinds', () => {
      deck.questions.forEach(q => expect(CONTENT_KINDS).toContain(q.kind));
    });

    it.each([...CONTENT_KINDS])(
      'step 2 — %s appears at least 5 times',
      kind => {
        expect(
          deck.questions.filter(q => q.kind === kind).length,
        ).toBeGreaterThanOrEqual(5);
      },
    );
  });
};

// All automatic content checks pass, and breaking any one of them — in this category's deck —
// fails the suite.
export const describeContentChecks = (ac: string, category: string) => {
  const deck = deckOf(category)!;
  const copy = (): Deck => JSON.parse(JSON.stringify(deck));
  const broken = (change: (deck: Deck) => void) => {
    const changed = copy();
    change(changed);
    return checkDeck(changed);
  };

  describe(`${ac} All automatic content checks pass; breaking any one fails the suite`, () => {
    it('step 1 — every deck the app ships passes every content check', () => {
      expect(checkDecks(decks)).toEqual([]);
    });

    it.each<[string, (deck: Deck) => void]>([
      ['a question fewer than 50', d => void d.questions.pop()],
      [
        'a question more than 50',
        d => void d.questions.push({ ...d.questions[0], id: 'extra' }),
      ],
      [
        'a missing English answer',
        d =>
          void delete (d.questions[0].en as Partial<Deck['questions'][0]['en']>)
            .answer,
      ],
      ['an empty Polish answer', d => void (d.questions[0].pl.answer = ' ')],
      [
        'two answers instead of one',
        d =>
          void ((d.questions[0].pl as unknown as { answer: string[] }).answer =
            ['a', 'b']),
      ],
      [
        'a missing Polish question',
        d => void delete (d.questions[0] as Partial<Deck['questions'][0]>).pl,
      ],
      [
        'a question of 101 characters',
        d => void (d.questions[0].en.question = 'x'.repeat(101)),
      ],
      [
        'an answer of 61 characters',
        d => void (d.questions[0].pl.answer = 'x'.repeat(61)),
      ],
      [
        'a kind with fewer than 5 questions',
        d =>
          d.questions
            .filter(q => q.kind === 'trivia')
            .slice(0, -4)
            .forEach(q => (q.kind = 'nature')),
      ],
      [
        'an unknown kind',
        d => void ((d.questions[0] as { kind: string }).kind = 'history'),
      ],
      ['a question without an id', d => void (d.questions[0].id = '')],
      [
        'an illustration that is not a file name',
        d => void (d.questions[0].illustration = ''),
      ],
      [
        'a wrong schema version',
        d => void ((d as { schemaVersion: number }).schemaVersion = 2),
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

      // Another category, its own ids and texts, but one Polish text taken from this deck.
      const sharedText = copy();
      sharedText.category = 'other';
      sharedText.questions.forEach((q, i) => {
        q.id = `other-${i}`;
        q.pl.question = `inne pytanie ${i}`;
        q.en.question = `another question ${i}`;
      });
      sharedText.questions[7].pl.question = deck.questions[3].pl.question;
      expect(checkDecks([deck, sharedText])).toEqual([
        `pl question "${deck.questions[3].pl.question.toLowerCase()}" appears more than once`,
      ]);

      // The same category twice, with its own ids and texts: only the category is reported.
      const sameCategory = copy();
      sameCategory.questions.forEach((q, i) => {
        q.id = `other-${i}`;
        q.pl.question = `inne pytanie ${i}`;
        q.en.question = `another question ${i}`;
      });
      expect(checkDecks([deck, sameCategory])).toEqual([
        `category ${category} appears in more than one deck`,
      ]);

      // A missing text is reported once, as missing — never as a duplicate "undefined".
      const missingText = copy();
      delete (missingText.questions[0] as Partial<Deck['questions'][0]>).en;
      delete (missingText.questions[1] as Partial<Deck['questions'][0]>).en;
      expect(
        checkDecks([missingText]).filter(problem =>
          problem.includes('appears'),
        ),
      ).toEqual([]);
    });

    it('step 4 — a question with an illustration file name passes', () => {
      expect(broken(d => (d.questions[0].illustration = 'sun.png'))).toEqual(
        [],
      );
    });
  });
};
