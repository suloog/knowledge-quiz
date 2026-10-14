// US-01-04#6 — none of the 5+ questions repeats a 3+ or 4+ question: not its text, in either
// language, and not the thing it asks for, so no younger question comes back in other words
// (DEC-50, DEC-51).
import { decks } from '../../src/content';
import { checkDecks } from '../../src/content/checks';
import type { Deck } from '../../src/content/deck';

const fivePlus = decks.find(deck => deck.category === '5+')!;
const younger = ['3+', '4+'].map(
  category => decks.find(deck => deck.category === category)!,
);

// Lower case, without punctuation, so "Ile nóg ma pająk?" and "ile nóg ma pająk" are one text.
const text = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
// The English answer without its article: "A dog." and "dog" name one thing.
const thing = (answer: string) => text(answer).replace(/^(a|an|the) /, '');

describe('AC-01-04-6 None of the 5+ questions repeats a 3+ or 4+ question', () => {
  it.each(['pl', 'en'] as const)(
    'step 1 — no 5+ %s question has the text of a 3+ or 4+ question',
    language => {
      younger.forEach(deck => expect(deck).toBeDefined());
      const asked = new Set(
        younger.flatMap(deck =>
          deck.questions.map(q => text(q[language].question)),
        ),
      );
      const repeated = fivePlus.questions.filter(q =>
        asked.has(text(q[language].question)),
      );
      expect(repeated.map(q => q.id)).toEqual([]);
    },
  );

  it('step 2 — no 5+ question asks for what a 3+ or 4+ question asks for', () => {
    const answers = new Set(
      younger.flatMap(deck => deck.questions.map(q => thing(q.en.answer))),
    );
    const repeated = fivePlus.questions.filter(q =>
      answers.has(thing(q.en.answer)),
    );
    expect(repeated.map(q => `${q.id}: ${q.en.answer}`)).toEqual([]);
  });

  it.each(['3+', '4+'])(
    'step 3 — a %s question copied into the 5+ deck fails the content checks',
    category => {
      const source = younger.find(deck => deck.category === category)!;
      const copied: Deck = JSON.parse(JSON.stringify(fivePlus));
      copied.questions[0].en = { ...source.questions[0].en };
      expect(checkDecks([source, copied])).toEqual([
        `en question "${source.questions[0].en.question.toLowerCase()}" appears more than once`,
      ]);
    },
  );
});
