// AC-01-02-7 step 2: the release APK's embedded JavaScript bundle holds every deck's questions and
// answers, in both languages — the content ships inside the app.
//
//   node scripts/check-bundle-content.js <index.android.bundle>
//
// Hermes bytecode keeps an ASCII string as its bytes and any other as UTF-16; a plain JavaScript
// bundle keeps it as UTF-8. A text counts as present in any of these forms. Prints what is missing
// and exits 1 when anything is.
const fs = require('fs');

const bundle = fs.readFileSync(process.argv[2]);
const decksDir = `${__dirname}/../src/content/decks`;
const decks = fs
  .readdirSync(decksDir)
  .filter(file => file.endsWith('.json'))
  .map(file => JSON.parse(fs.readFileSync(`${decksDir}/${file}`, 'utf8')));

const present = text =>
  bundle.includes(Buffer.from(text, 'utf8')) ||
  bundle.includes(Buffer.from(text, 'utf16le'));

const texts = decks.flatMap(deck =>
  deck.questions.flatMap(q => [
    q.id,
    q.pl.question,
    q.pl.answer,
    q.en.question,
    q.en.answer,
  ]),
);
const missing = texts.filter(text => !present(text));

console.log(
  `${decks.map(d => d.category).join(', ')}: ${texts.length - missing.length} of ${texts.length} texts found in the bundle`,
);
missing.forEach(text => console.log(`missing: ${text}`));
process.exit(missing.length === 0 && texts.length > 0 ? 0 : 1);
