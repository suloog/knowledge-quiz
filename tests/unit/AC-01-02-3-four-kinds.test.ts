// US-01-02#3 — each of the four kinds of content appears at least 5 times among the 50 questions
// (Q30).
import { decks } from '../../src/content';
import { CONTENT_KINDS } from '../../src/content/deck';

const threePlus = decks.find(deck => deck.category === '3+')!;

describe('AC-01-02-3 Each kind of content appears at least 5 times in the 3+ deck', () => {
  it('step 1 — every question is one of the four kinds', () => {
    threePlus.questions.forEach(q => expect(CONTENT_KINDS).toContain(q.kind));
  });

  it.each([...CONTENT_KINDS])('step 2 — %s appears at least 5 times', kind => {
    expect(
      threePlus.questions.filter(q => q.kind === kind).length,
    ).toBeGreaterThanOrEqual(5);
  });
});
