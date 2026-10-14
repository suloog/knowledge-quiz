// US-01-03#6 — none of the 4+ questions repeats a 3+ question: not its text, in either language, and
// not the thing a 3+ question asks for, so no 3+ question comes back in other words.
import { decks } from '../../src/content';
import { checkDecks } from '../../src/content/checks';
import type { Deck } from '../../src/content/deck';

const threePlus = decks.find(deck => deck.category === '3+')!;
const fourPlus = decks.find(deck => deck.category === '4+')!;

// Lower case, without punctuation, so "Ile nóg ma pająk?" and "ile nóg ma pająk" are one text.
const text = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
// The English answer without its article: "A dog." and "dog" name one thing.
const thing = (answer: string) => text(answer).replace(/^(a|an|the) /, '');

describe('AC-01-03-6 None of the 4+ questions repeats a 3+ question', () => {
  it.each(['pl', 'en'] as const)(
    'step 1 — no 4+ %s question has the text of a 3+ question',
    language => {
      const asked = new Set(
        threePlus.questions.map(q => text(q[language].question)),
      );
      const repeated = fourPlus.questions.filter(q =>
        asked.has(text(q[language].question)),
      );
      expect(repeated.map(q => q.id)).toEqual([]);
    },
  );

  it('step 2 — no 4+ question asks for what a 3+ question asks for', () => {
    const answers = new Set(threePlus.questions.map(q => thing(q.en.answer)));
    const repeated = fourPlus.questions.filter(q =>
      answers.has(thing(q.en.answer)),
    );
    expect(repeated.map(q => `${q.id}: ${q.en.answer}`)).toEqual([]);
  });

  it('step 3 — a 3+ question copied into the 4+ deck fails the content checks', () => {
    const copied: Deck = JSON.parse(JSON.stringify(fourPlus));
    copied.questions[0].pl = { ...threePlus.questions[0].pl };
    expect(checkDecks([threePlus, copied])).toEqual([
      `pl question "${threePlus.questions[0].pl.question.toLowerCase()}" appears more than once`,
    ]);
  });
});
