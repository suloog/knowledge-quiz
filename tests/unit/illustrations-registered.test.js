// Node, so plain JavaScript: the TypeScript project has no Node types.
const fs = require('fs');
const path = require('path');
const { decks, illustrations } = require('../../src/content');

const DIR = path.join(__dirname, '../../src/content/illustrations');
const files = fs
  .readdirSync(DIR)
  .filter(f => f.endsWith('.png'))
  .sort();
const named = decks.flatMap(deck =>
  deck.questions.flatMap(q => (q.illustration ? [q.illustration] : [])),
);

describe('illustrations', () => {
  it('lists every PNG file, and only those', () => {
    expect(Object.keys(illustrations).sort()).toEqual(files);
  });

  it('shows only illustrations that are listed', () => {
    expect(named.filter(name => !(name in illustrations))).toEqual([]);
  });

  it('ships no illustration that no question uses, and gives each to one question', () => {
    expect([...named].sort()).toEqual(files);
  });

  it('keeps an illustration on the question, not on one language', () => {
    decks.forEach(deck =>
      deck.questions.forEach(q => {
        expect(q.pl).not.toHaveProperty('illustration');
        expect(q.en).not.toHaveProperty('illustration');
      }),
    );
  });
});
