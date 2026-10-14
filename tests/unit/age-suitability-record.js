// The age-suitability record every deck story keeps (Q29, DEC-46, DEC-47): a markdown table,
// copied into the pull request, with a row per question passing all four checks and naming the
// near misses checked for its one answer; and no question of the deck offers answer options. Each
// story's AC-NN-MM-4 test calls this with its id, its category and its record. Not a test file.
const fs = require('fs');
const path = require('path');
const { decks } = require('../../src/content');

// "czy" as a word in Polish, "or" as a word in English: the way a question names options.
const OFFERS_OPTIONS = { pl: /(^|[^\p{L}])czy([^\p{L}]|$)/iu, en: /\bor\b/i };

const describeAgeSuitabilityRecord = ({ ac, category, record, idPrefix }) => {
  const text = fs.readFileSync(path.join(__dirname, '../..', record), 'utf8');
  const deck = decks.find(d => d.category === category);

  // | Id | Question (pl) | Answer (pl) | Question (en) | Answer (en) | Near misses checked
  // | Known words | Nothing frightening | One answer | Verifiable |
  const entries = text
    .split('\n')
    .filter(line => line.startsWith(`| ${idPrefix}`))
    .map(line => {
      const cells = line.split('|').map(cell => cell.trim());
      // Every cell between the first and the last pipe: an extra or a missing column shows.
      return [cells[1], cells.slice(2, -1)];
    });
  const rows = new Map(entries);

  describe(`${ac} The age-suitability check of every ${category} question is recorded`, () => {
    it(`step 1 — ${record} has one row for every question of the deck, and no other`, () => {
      const missing = deck.questions.filter(q => !rows.has(q.id));
      expect(missing.map(q => q.id)).toEqual([]);
      const ids = entries.map(([id]) => id);
      const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
      expect(repeated).toEqual([]);
      expect(entries.length).toBe(deck.questions.length);
    });

    it('step 2 — each row names the question it checked and its answer, in Polish and English', () => {
      deck.questions.forEach(q => {
        const cells = rows.get(q.id);
        expect({ id: q.id, cells: cells.length }).toEqual({
          id: q.id,
          cells: 9,
        });
        const [plQuestion, plAnswer, enQuestion, enAnswer] = cells;
        expect({
          id: q.id,
          pl: { question: plQuestion, answer: plAnswer },
          en: { question: enQuestion, answer: enAnswer },
        }).toEqual({ id: q.id, pl: q.pl, en: q.en });
      });
    });

    it('step 3 — every question passes all four checks: known words, nothing frightening, one answer, verifiable', () => {
      const failing = deck.questions.filter(q => {
        const checks = rows.get(q.id).slice(5);
        return checks.length !== 4 || checks.some(check => check !== 'pass');
      });
      expect(failing.map(q => q.id)).toEqual([]);
    });

    it('step 4 — every row names the near misses checked for its one answer', () => {
      const empty = deck.questions.filter(q => {
        const nearMisses = rows.get(q.id)[4];
        return !nearMisses || /^(—|-|none|n\/a)$/i.test(nearMisses);
      });
      expect(empty.map(q => q.id)).toEqual([]);
    });

    it(`step 5 — no ${category} question names answer options, in Polish or in English`, () => {
      const offering = deck.questions.flatMap(q =>
        Object.entries(OFFERS_OPTIONS)
          .filter(([language, pattern]) => pattern.test(q[language].question))
          .map(([language]) => `${q.id} ${language}: ${q[language].question}`),
      );
      expect(offering).toEqual([]);
    });
  });
};

module.exports = { describeAgeSuitabilityRecord };
