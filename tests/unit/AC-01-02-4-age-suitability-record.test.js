// US-01-02#4 — the age-suitability check of every 3+ question is recorded (Q29, DEC-46): the
// record, copied into the pull request, has a row passing all four checks for each question and
// naming the near misses checked for its one answer; no 3+ question offers answer options (DEC-47).
const fs = require('fs');
const path = require('path');
const { decks } = require('../../src/content');

const RECORD = 'docs/delivery/content-checks/US-01-02-3-plus.md';
const record = fs.readFileSync(path.join(__dirname, '../..', RECORD), 'utf8');
const threePlus = decks.find(deck => deck.category === '3+');

// | Id | Question (pl) | Answer (pl) | Question (en) | Answer (en) | Near misses checked
// | Known words | Nothing frightening | One answer | Verifiable |
const entries = record
  .split('\n')
  .filter(line => line.startsWith('| 3p-'))
  .map(line => {
    const cells = line.split('|').map(cell => cell.trim());
    // Every cell between the first and the last pipe: an extra or a missing column shows.
    return [cells[1], cells.slice(2, -1)];
  });
const rows = new Map(entries);

// "czy" as a word in Polish, "or" as a word in English: the way a question names options.
const OFFERS_OPTIONS = { pl: /(^|[^\p{L}])czy([^\p{L}]|$)/iu, en: /\bor\b/i };

describe('AC-01-02-4 The age-suitability check of every 3+ question is recorded', () => {
  it(`step 1 — ${RECORD} has one row for every question of the deck, and no other`, () => {
    const missing = threePlus.questions.filter(q => !rows.has(q.id));
    expect(missing.map(q => q.id)).toEqual([]);
    const ids = entries.map(([id]) => id);
    const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(repeated).toEqual([]);
    expect(entries.length).toBe(threePlus.questions.length);
  });

  it('step 2 — each row names the question it checked and its answer, in Polish and English', () => {
    threePlus.questions.forEach(q => {
      const cells = rows.get(q.id);
      expect({ id: q.id, cells: cells.length }).toEqual({ id: q.id, cells: 9 });
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
      const checks = rows.get(q.id).slice(5);
      return checks.length !== 4 || checks.some(check => check !== 'pass');
    });
    expect(failing.map(q => q.id)).toEqual([]);
  });

  it('step 4 — every row names the near misses checked for its one answer', () => {
    const empty = threePlus.questions.filter(q => {
      const nearMisses = rows.get(q.id)[4];
      return !nearMisses || /^(—|-|none|n\/a)$/i.test(nearMisses);
    });
    expect(empty.map(q => q.id)).toEqual([]);
  });

  it('step 5 — no 3+ question names answer options, in Polish or in English', () => {
    const offering = threePlus.questions.flatMap(q =>
      Object.entries(OFFERS_OPTIONS)
        .filter(([language, pattern]) => pattern.test(q[language].question))
        .map(([language]) => `${q.id} ${language}: ${q[language].question}`),
    );
    expect(offering).toEqual([]);
  });
});
