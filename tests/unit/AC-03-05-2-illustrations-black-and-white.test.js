// US-03-05#2 — every illustration is pure black and white; a test fails on any other pixel value
// (MOD-01-F13, NFR-07, constitution: content quality is tested).
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { readPng } = require('./support/png');

const DIR = path.join(__dirname, '../../src/content/illustrations');
const BLACK_AND_WHITE = ['#000000', '#FFFFFF'];

// What is wrong with one PNG: its format, and every pixel that is not #000000 or #FFFFFF.
const problems = file => {
  let png;
  try {
    png = readPng(file);
  } catch (error) {
    return [`unreadable: ${error.message}`];
  }
  const found = [];
  if (png.bitDepth !== 1 || png.colourType !== 0) {
    found.push(
      `not a 1-bit black-and-white PNG (bit depth ${png.bitDepth}, colour type ${png.colourType})`,
    );
  }
  const others = new Set(png.pixels.filter(p => !BLACK_AND_WHITE.includes(p)));
  if (others.size) found.push(`pixels of ${[...others].join(', ')}`);
  if (png.pixels.length !== png.width * png.height || !png.pixels.length) {
    found.push('no pixels read');
  }
  return found;
};

// A PNG of the given 8-bit RGBA pixels, one row.
const chunk = (type, data) => {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(body));
  return Buffer.concat([length, body, crc]);
};
const rgbaPng = pixels => {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(pixels.length, 0);
  header.writeUInt32BE(1, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from('89504e470d0a1a0a', 'hex'),
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(Buffer.from([0, ...pixels.flat()]))),
    chunk('IEND', Buffer.alloc(0)),
  ]);
};

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));

describe('AC-03-05-2 Every illustration is pure black and white', () => {
  it('step 1 — every illustration file is a 1-bit PNG of #000000 and #FFFFFF pixels only', () => {
    expect(files.length).toBeGreaterThan(0);
    files.forEach(name => {
      const png = readPng(fs.readFileSync(path.join(DIR, name)));
      expect({ name, pixels: png.pixels.length }).toEqual({
        name,
        pixels: png.width * png.height,
      });
      // Both colours are drawn: a picture, not a blank.
      expect({ name, colours: [...new Set(png.pixels)].sort() }).toEqual({
        name,
        colours: BLACK_AND_WHITE,
      });
      expect({
        name,
        problems: problems(fs.readFileSync(path.join(DIR, name))),
      }).toEqual({
        name,
        problems: [],
      });
    });
  });

  it('step 2 — a grey, a coloured or a see-through pixel fails the check', () => {
    const black = [0, 0, 0, 255];
    const white = [255, 255, 255, 255];
    expect(problems(rgbaPng([black, white, [128, 128, 128, 255]]))).toEqual([
      'not a 1-bit black-and-white PNG (bit depth 8, colour type 6)',
      'pixels of #808080',
    ]);
    expect(problems(rgbaPng([black, [255, 0, 0, 255]]))).toContain(
      'pixels of #FF0000',
    );
    expect(problems(rgbaPng([white, [0, 0, 0, 0]]))).toContain(
      'pixels of #00000000',
    );
    // Black and white in an 8-bit file: the pixels pass, the format does not (MOD-01-F13: 1-bit).
    expect(problems(rgbaPng([black, white]))).toEqual([
      'not a 1-bit black-and-white PNG (bit depth 8, colour type 6)',
    ]);
    expect(problems(Buffer.from('not a picture'))).toEqual([
      'unreadable: not a PNG',
    ]);
  });
});
