// US-01-02#6 — adding a question or an age category is a change of content data only (DEC-46): a
// category is its JSON file plus one import line in src/content/decks/index.ts, and screens read
// content only through src/content.
const fs = require('fs');
const path = require('path');
const { decks } = require('../../src/content');

const root = path.join(__dirname, '../..');
const decksDir = path.join(root, 'src/content/decks');
const filesUnder = dir =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap(entry =>
      entry.isDirectory()
        ? filesUnder(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    );

describe('AC-01-02-6 Adding a question or an age category changes content data only', () => {
  it('step 1 — every deck file in src/content/decks is registered, so the app ships it', () => {
    const files = fs.readdirSync(decksDir).filter(f => f.endsWith('.json'));
    expect(files.length).toBeGreaterThan(0);
    files.forEach(file => {
      expect(decks).toContainEqual(require(path.join(decksDir, file)));
    });
    expect(decks).toHaveLength(files.length);
  });

  it('step 2 — no screen reads a deck file or holds a question of its own', () => {
    const screens = filesUnder(path.join(root, 'src/app')).filter(
      f => /\.tsx?$/.test(f) && !f.includes('__tests__'),
    );
    const questions = decks.flatMap(deck =>
      deck.questions.flatMap(q => [q.pl.question, q.en.question]),
    );
    screens.forEach(file => {
      const source = fs.readFileSync(file, 'utf8');
      expect(source).not.toMatch(/content\/decks|\.json['"]/);
      questions.forEach(q => expect(source).not.toContain(q));
    });
  });

  it('step 3 — the content checks name no category: a new deck is checked as it is', () => {
    const checks = fs.readFileSync(
      path.join(root, 'src/content/checks.ts'),
      'utf8',
    );
    expect(checks).not.toMatch(/['"][345]\+['"]|3-plus/);
  });
});
