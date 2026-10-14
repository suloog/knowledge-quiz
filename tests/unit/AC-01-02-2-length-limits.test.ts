// US-01-02#2 — every question is at most 100 characters and every answer at most 60, in each
// language (DEC-39).
import { decks } from '../../src/content';

const threePlus = decks.find(deck => deck.category === '3+')!;

describe('AC-01-02-2 Every 3+ question is at most 100 characters and every answer at most 60', () => {
  it.each(['pl', 'en'] as const)(
    'step 1 — no %s question is longer than 100 characters',
    language => {
      const tooLong = threePlus.questions.filter(
        q => q[language].question.length > 100,
      );
      expect(tooLong.map(q => q.id)).toEqual([]);
    },
  );

  it.each(['pl', 'en'] as const)(
    'step 2 — no %s answer is longer than 60 characters',
    language => {
      const tooLong = threePlus.questions.filter(
        q => q[language].answer.length > 60,
      );
      expect(tooLong.map(q => q.id)).toEqual([]);
    },
  );
});
