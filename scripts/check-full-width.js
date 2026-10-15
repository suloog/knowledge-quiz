// TC-02-02 step 2 — each category entry is as wide as the screen. Reads a uiautomator dump of the
// category screen and writes the result as a JUnit case (scripts/test-acceptance.sh).
//
//   node scripts/check-full-width.js <dump.xml> <screen width px> <entries expected> <junit.xml>
//
// uiautomator clips bounds to the display, so an entry wider than the screen also reads 0–width:
// the check proves an entry spans the screen, not that it ends exactly at its edge.
const fs = require('fs');

const [dumpFile, screenWidth, expected, junitFile] = process.argv.slice(2);
const NAME =
  'TC-02-02 step 2 — each category entry is as wide as the screen (entry bounds from uiautomator, screen width from wm size)';

const dump = fs.existsSync(dumpFile) ? fs.readFileSync(dumpFile, 'utf8') : '';
const entries = [
  ...dump.matchAll(
    /resource-id="(category-\d+)"[^>]*bounds="\[(\d+),\d+\]\[(\d+),\d+\]"/g,
  ),
].map(([, id, left, right]) => ({ id, left: +left, right: +right }));

const problems = [];
if (!(Number(expected) > 0)) {
  problems.push(
    `no category is expected (${expected}): the shipped content holds none`,
  );
} else if (entries.length !== Number(expected)) {
  problems.push(
    `${entries.length} category entries on screen, expected ${expected}`,
  );
}
entries
  .filter(e => e.left !== 0 || e.right !== Number(screenWidth))
  .forEach(e =>
    problems.push(
      `${e.id} spans ${e.left}–${e.right}, the screen 0–${screenWidth}`,
    ),
  );

const escape = text =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const failure = problems.length
  ? `<failure message="${escape(problems.join('; '))}"/>`
  : '';
fs.writeFileSync(
  junitFile,
  `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="category-screen" tests="1" failures="${problems.length ? 1 : 0}">
    <testcase classname="category-screen" name="${escape(NAME)}">${failure}</testcase>
  </testsuite>
</testsuites>
`,
);
entries.forEach(e =>
  console.log(`${e.id}: ${e.left}–${e.right} of 0–${screenWidth}`),
);
console.log(problems.length ? `FAIL: ${problems.join('; ')}` : `pass: ${NAME}`);
process.exit(problems.length ? 1 : 0);
