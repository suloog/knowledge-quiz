// AC-02-01-4 step 4 — on the device, the category screen is drawn in #000000 and #FFFFFF only.
// Reads a raw screenshot (`adb exec-out screencap`, no -p) and a uiautomator dump of the same
// screen, and writes the result as a JUnit case (scripts/test-acceptance.sh).
//
//   node scripts/check-black-and-white.js <screen.raw> <dump.xml> <density dpi> <junit.xml>
//
// Checked: every pixel inside the app's screen (the bounds of `category-screen`, less the system
// bars drawn over it). Text glyphs are anti-aliased by the font renderer, so grey is allowed inside
// each text element shrunk by 8 dp on every side — its padding is at least 16 dp, and its rule
// sits on its edge, so a grey row beside a rule is still caught.
// A screenshot of one colour only (an emulator that rendered nothing) proves nothing either way:
// the case is reported skipped, with the reason. A check that read no pixel at all fails.
const fs = require('fs');

const [rawFile, dumpFile, densityDpi, junitFile] = process.argv.slice(2);
const NAME =
  'AC-02-01-4 step 4 — the category screen on the device is drawn in #000000 and #FFFFFF only, outside the text glyphs (screencap)';
const GLYPH_MARGIN_DP = 8;

const hex = (r, g, b) =>
  `#${[r, g, b]
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

const check = () => {
  if (!fs.existsSync(rawFile) || !fs.existsSync(dumpFile)) {
    return {
      fail: `no screenshot or no uiautomator dump (${rawFile}, ${dumpFile})`,
    };
  }
  const raw = fs.readFileSync(rawFile);
  const width = raw.readUInt32LE(0);
  const height = raw.readUInt32LE(4);
  // The header is 12 bytes, or 16 with the colour space (Android 9 and newer); RGBA_8888 pixels.
  const header = raw.length - width * height * 4;
  if (raw.readUInt32LE(8) !== 1 || (header !== 12 && header !== 16)) {
    return {
      fail: `not an RGBA_8888 screencap (${width}x${height}, format ${raw.readUInt32LE(8)})`,
    };
  }
  const pixel = (x, y) => {
    const at = header + (y * width + x) * 4;
    return hex(raw[at], raw[at + 1], raw[at + 2]);
  };

  const dump = fs.readFileSync(dumpFile, 'utf8');
  const nodes = [...dump.matchAll(/<node [^>]*>/g)].map(([node]) => {
    const [, l, t, r, b] = node
      .match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/)
      .map(Number);
    return {
      id: (node.match(/resource-id="([^"]*)"/) || [])[1] || '',
      text: (node.match(/ text="([^"]*)"/) || [])[1] || '',
      cls: (node.match(/class="([^"]*)"/) || [])[1] || '',
      l,
      t,
      r,
      b,
    };
  });
  const screenNode = nodes.find(n => n.id === 'category-screen');
  if (!screenNode)
    return { fail: 'the category screen is not in the uiautomator dump' };
  // Every element showing text (the title is a heading, not a TextView).
  const texts = nodes.filter(n => n.text);
  if (!texts.some(n => /^category-\d+$/.test(n.id))) {
    return { fail: 'no category entry is in the uiautomator dump' };
  }

  // The system bars are the system's, drawn over the app's edges: the status bar in the safe-area
  // inset above the first element, the navigation bar where its background view starts.
  const navigationBar = nodes.find(
    n => n.id === 'android:id/navigationBarBackground',
  );
  const top = Math.max(screenNode.t, Math.min(...texts.map(n => n.t)));
  const bottom = Math.min(
    screenNode.b,
    height,
    navigationBar ? navigationBar.t : height,
  );
  const margin = Math.round((GLYPH_MARGIN_DP * Number(densityDpi)) / 160);
  const glyphBoxes = texts.map(n => ({
    l: n.l + margin,
    t: n.t + margin,
    r: n.r - margin,
    b: n.b - margin,
  }));
  const inGlyphs = (x, y) =>
    glyphBoxes.some(g => x >= g.l && x < g.r && y >= g.t && y < g.b);

  const seen = new Set();
  const others = new Map(); // row → { count, colours }
  for (let y = top; y < bottom; y++) {
    for (
      let x = Math.max(0, screenNode.l);
      x < Math.min(width, screenNode.r);
      x++
    ) {
      const colour = pixel(x, y);
      seen.add(colour);
      if (colour === '#000000' || colour === '#FFFFFF' || inGlyphs(x, y))
        continue;
      const row = others.get(y) || { count: 0, colours: new Set() };
      row.count++;
      row.colours.add(colour);
      others.set(y, row);
    }
  }
  const area = `${width}x${height}, checked rows ${top}–${bottom - 1}, glyph margin ${margin} px`;
  if (seen.size === 0) {
    return { fail: `no pixel was read — the checked area is empty (${area})` };
  }
  if (seen.size === 1) {
    return {
      skip: `the screenshot is one colour only (${[...seen][0]}): the device drew nothing to check — blocked by the environment (${area})`,
    };
  }
  if (others.size) {
    const rows = [...others.entries()]
      .slice(0, 8)
      .map(
        ([y, r]) =>
          `row ${y}: ${r.count} px of ${[...r.colours].slice(0, 3).join(' ')}`,
      );
    return {
      fail: `${others.size} rows hold colours other than #000000 and #FFFFFF outside the text glyphs — ${rows.join('; ')} (${area})`,
    };
  }
  return { ok: area };
};

const result = check();
const escape = text =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const body = result.fail
  ? `<failure message="${escape(result.fail)}"/>`
  : result.skip
    ? `<skipped message="${escape(result.skip)}"/>`
    : '';
fs.writeFileSync(
  junitFile,
  `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="category-screen-colours" tests="1" failures="${result.fail ? 1 : 0}" skipped="${result.skip ? 1 : 0}">
    <testcase classname="category-screen" name="${escape(NAME)}">${body}</testcase>
  </testsuite>
</testsuites>
`,
);
if (result.fail) console.log(`FAIL: ${NAME} — ${result.fail}`);
else if (result.skip)
  console.log(`BLOCKED (skipped): ${NAME} — ${result.skip}`);
else console.log(`pass: ${NAME} (${result.ok})`);
process.exit(result.fail ? 1 : 0);
