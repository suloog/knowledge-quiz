// US-01-02#4 — the age-suitability check of every 3+ question is recorded (Q29, DEC-46): the
// record, copied into the pull request, has a row passing all four checks for each question.
const fs = require('fs');
const path = require('path');
const { decks } = require('../../src/content');

const RECORD = 'docs/delivery/content-checks/US-01-02-3-plus.md';
const record = fs.readFileSync(path.join(__dirname, '../..', RECORD), 'utf8');
const threePlus = decks.find(deck => deck.category === '3+');

// | Id | Question (pl) | Answer (pl) | Question (en) | Answer (en) | Known words | Nothing frightening
// | One answer | Verifiable |
const rows = new Map(
  record
    .split('\n')
    .filter(line => line.startsWith('| 3p-'))
    .map(line => {
      const cells = line.split('|').map(cell => cell.trim());
      // Every cell between the first and the last pipe: an extra or a missing column shows.
      return [cells[1], cells.slice(2, -1)];
    }),
);

describe('AC-01-02-4 The age-suitability check of every 3+ question is recorded', () => {
  it(`step 1 — ${RECORD} has a row for every question of the deck`, () => {
    const missing = threePlus.questions.filter(q => !rows.has(q.id));
    expect(missing.map(q => q.id)).toEqual([]);
  });

  it('step 2 — each row names the question it checked and its answer, in Polish and English', () => {
    threePlus.questions.forEach(q => {
      const cells = rows.get(q.id);
      expect({ id: q.id, cells: cells.length }).toEqual({ id: q.id, cells: 8 });
      const [plQuestion, plAnswer, enQuestion, enAnswer] = cells;
      expect({
        id: q.id,
        pl: { question: plQuestion, answer: plAnswer },
        en: { question: enQuestion, answer: enAnswer },
      }).toEqual({ id: q.id, pl: q.pl, en: q.en });
    });
  });

  it('step 3 — every question passes all four checks: known words, nothing frightening, one answer, verifiable', () => {
    const failing = threePlus.questions.filter(q => {
      const checks = rows.get(q.id).slice(4);
      return checks.length !== 4 || checks.some(check => check !== 'pass');
    });
    expect(failing.map(q => q.id)).toEqual([]);
  });
});
