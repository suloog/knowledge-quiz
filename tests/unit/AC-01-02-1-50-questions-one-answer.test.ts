// US-01-02#1 — the 3+ category holds exactly 50 questions, each with exactly one answer, in Polish
// and in English.
import { decks } from '../../src/content';

const threePlus = decks.find(deck => deck.category === '3+');

describe('AC-01-02-1 The 3+ category holds 50 questions, each with one answer in Polish and English', () => {
  it('step 1 — the 3+ deck ships with the app', () => {
    expect(threePlus).toBeDefined();
  });

  it('step 2 — it holds exactly 50 questions', () => {
    expect(threePlus?.questions).toHaveLength(50);
  });

  it.each(['pl', 'en'] as const)(
    'step 3 — every question has its question and exactly one answer in %s',
    language => {
      threePlus?.questions.forEach(question => {
        expect(typeof question[language].question).toBe('string');
        expect(question[language].question.trim()).not.toBe('');
        expect(typeof question[language].answer).toBe('string');
        expect(question[language].answer.trim()).not.toBe('');
      });
    },
  );
});
