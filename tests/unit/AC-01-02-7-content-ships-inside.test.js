// US-01-02#7 — all content ships inside the app; nothing is downloaded (DEC-46). The release APK's
// embedded bundle is checked by scripts/test-acceptance.sh (AC-01-02-7 step 2); TC-01-02 runs in
// US-03-01, once the category screen exists (DEC-44).
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../../src/content');
const sources = fs
  .readdirSync(contentDir, { recursive: true, encoding: 'utf8' })
  .filter(f => /\.(ts|tsx|json)$/.test(f) && !f.includes('__tests__'));

describe('AC-01-02-7 All content ships inside the app; nothing is downloaded', () => {
  it('step 1 — the content code makes no network call and names no remote address', () => {
    expect(sources.length).toBeGreaterThan(0);
    sources.forEach(file => {
      const source = fs.readFileSync(path.join(contentDir, file), 'utf8');
      expect({
        file,
        network: /\bfetch\s*\(|XMLHttpRequest|WebSocket|https?:\/\//.test(
          source,
        ),
      }).toEqual({
        file,
        network: false,
      });
    });
  });
});
