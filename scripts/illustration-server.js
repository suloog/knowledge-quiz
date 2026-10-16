// What the illustration flows (TC-03-20…TC-03-22) need from the device while they run, and Maestro
// cannot give: whether a question's illustration is on the screen pixel for pixel, and a change of
// the device's language in the middle of a flow. Run by scripts/test-acceptance.sh.
//
//   node scripts/illustration-server.js <adb> <port> <evidence dir> <set-locale dex on the device>
//
// GET /illustration/<file>/<name> takes a screenshot (`screencap`, raw) and looks in it for the
// shipped picture src/content/illustrations/<file>, every one of its pixels the same #000000 or
// #FFFFFF: shown at one image pixel to one screen pixel, as the app draws it, it is there exactly or
// not at all — a scaled, smoothed or other picture is not found. Answers, and keeps as evidence in
// <evidence dir>/<name>.json, { found, x, y, width, height }.
//
// GET /locale/<tag> sets the device's language (scripts/SetLocale.java, run as the shell) and answers
// { locale, applied } once the system's configuration has it — until the language switch (US-02-03)
// the app follows the device's language (DEC-52). The app reads it when it starts.
//
// It listens on the host's loopback only: Maestro runs a flow's scripts on the host.
const { execFileSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { readPng } = require('../tests/unit/support/png');

const [adb, port, dir, dex] = process.argv.slice(2);
const ILLUSTRATIONS = path.join(__dirname, '../src/content/illustrations');

fs.mkdirSync(dir, { recursive: true });

const shell = command =>
  execFileSync(adb, ['shell', command], { encoding: 'utf8' });

// The screen's pixels, black (0), white (1) or anything else (2), from a raw RGBA_8888 screencap:
// a 12-byte header, or 16 with the colour space (Android 9 and newer).
const screen = () => {
  const raw = execFileSync(adb, ['exec-out', 'screencap'], {
    maxBuffer: 64 * 1024 * 1024,
  });
  const width = raw.readUInt32LE(0);
  const height = raw.readUInt32LE(4);
  const header = raw.length - width * height * 4;
  const pixels = new Uint8Array(width * height);
  for (let i = 0; i < pixels.length; i++) {
    const at = header + i * 4;
    const [r, g, b] = [raw[at], raw[at + 1], raw[at + 2]];
    pixels[i] =
      r === 0 && g === 0 && b === 0
        ? 0
        : r === 255 && g === 255 && b === 255
          ? 1
          : 2;
  }
  return { width, height, pixels };
};

// Where the picture is on the screen, every pixel the same; undefined when it is not there.
const find = file => {
  const png = readPng(fs.readFileSync(path.join(ILLUSTRATIONS, file)));
  const picture = png.pixels.map(p => (p === '#000000' ? 0 : 1));
  // Anchored on the picture's first black pixel: few places on a white screen are black.
  const anchor = picture.indexOf(0);
  const ax = anchor % png.width;
  const ay = Math.floor(anchor / png.width);
  const shown = screen();
  const matches = (left, top) => {
    for (let y = 0; y < png.height; y++) {
      const row = (top + y) * shown.width + left;
      for (let x = 0; x < png.width; x++) {
        if (shown.pixels[row + x] !== picture[y * png.width + x]) return false;
      }
    }
    return true;
  };
  for (let y = ay; y <= shown.height - png.height + ay; y++) {
    for (let x = ax; x <= shown.width - png.width + ax; x++) {
      if (shown.pixels[y * shown.width + x] === 0 && matches(x - ax, y - ay)) {
        return { x: x - ax, y: y - ay, width: png.width, height: png.height };
      }
    }
  }
  return undefined;
};

const setLocale = tag => {
  const [language, region] = tag.split('-');
  shell(`CLASSPATH=${dex} app_process / SetLocale ${tag}`);
  for (let i = 0; i < 30; i++) {
    if (shell('am get-config').includes(`-${language}-r${region}-`))
      return true;
    execFileSync('sleep', ['1']);
  }
  return false;
};

const answer = (request, response) => {
  const [what, ...rest] = decodeURIComponent(request.url)
    .split('/')
    .filter(Boolean);
  if (what === 'illustration' && rest.length === 2) {
    const [file, name] = rest.map(part => path.basename(part));
    const where = find(file);
    const result = { file, found: Boolean(where), ...where };
    fs.writeFileSync(
      path.join(dir, `${name.replace(/[^\w.-]/g, '_')}.json`),
      JSON.stringify(result, null, 2),
    );
    return result;
  }
  if (what === 'locale' && /^[a-z]{2}-[A-Z]{2}$/.test(rest[0] || '')) {
    return { locale: rest[0], applied: setLocale(rest[0]) };
  }
  return undefined;
};

http
  .createServer((request, response) => {
    let result;
    try {
      result = answer(request);
    } catch (error) {
      result = { error: error.message };
    }
    response.writeHead(result ? 200 : 404, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify(result || { error: 'unknown request' }));
  })
  .listen(Number(port), '127.0.0.1');
