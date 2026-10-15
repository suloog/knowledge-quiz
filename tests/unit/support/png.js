// Reads a PNG's pixels (Node, so plain JavaScript: the TypeScript project has no Node types), for the illustration check (US-03-05#2, MOD-01-F13): every pixel as
// '#RRGGBB', with its alpha when it is not opaque ('#RRGGBBAA'). Non-interlaced PNGs of any colour
// type and bit depth; anything else is reported as unreadable.
const zlib = require('zlib');

const CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

const hex = values =>
  `#${values
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};

const readPng = file => {
  if (file.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error('not a PNG');
  }
  let header;
  let palette;
  let transparency;
  const data = [];
  for (let at = 8; at < file.length; ) {
    const length = file.readUInt32BE(at);
    const type = file.toString('ascii', at + 4, at + 8);
    const body = file.subarray(at + 8, at + 8 + length);
    if (type === 'IHDR') header = body;
    else if (type === 'PLTE') palette = body;
    else if (type === 'tRNS') transparency = body;
    else if (type === 'IDAT') data.push(body);
    at += 12 + length;
  }
  if (!header) throw new Error('no IHDR chunk');
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  const bitDepth = header[8];
  const colourType = header[9];
  if (header[12] !== 0) throw new Error('interlaced');
  const channels = CHANNELS[colourType];
  if (!channels) throw new Error(`unknown colour type ${colourType}`);

  const bitsPerPixel = channels * bitDepth;
  const rowBytes = Math.ceil((width * bitsPerPixel) / 8);
  const step = Math.max(1, bitsPerPixel / 8);
  const raw = zlib.inflateSync(Buffer.concat(data));
  const rows = [];
  let previous = Buffer.alloc(rowBytes);
  for (let y = 0; y < height; y++) {
    const start = y * (rowBytes + 1);
    const filter = raw[start];
    const row = Buffer.from(raw.subarray(start + 1, start + 1 + rowBytes));
    for (let i = 0; i < rowBytes; i++) {
      const left = i >= step ? row[i - step] : 0;
      const up = previous[i];
      const upLeft = i >= step ? previous[i - step] : 0;
      const add = [0, left, up, (left + up) >> 1, paeth(left, up, upLeft)][
        filter
      ];
      if (add === undefined) throw new Error(`unknown filter ${filter}`);
      row[i] = (row[i] + add) & 0xff;
    }
    rows.push(row);
    previous = row;
  }

  // The samples of one pixel, each scaled to 0…255.
  const max = 2 ** bitDepth - 1;
  const samples = (row, x) =>
    Array.from({ length: channels }, (_, c) => {
      const bit = (x * channels + c) * bitDepth;
      if (bitDepth === 16) return row.readUInt16BE(bit / 8);
      if (bitDepth === 8) return row[bit / 8];
      return (row[bit >> 3] >> (8 - bitDepth - (bit & 7))) & max;
    });
  const scale = v => Math.round((v * 255) / max);

  const pixels = [];
  rows.forEach(row => {
    for (let x = 0; x < width; x++) {
      const s = samples(row, x);
      let rgba;
      if (colourType === 3) {
        if (!palette || s[0] * 3 + 2 >= palette.length) {
          throw new Error('a pixel outside the palette');
        }
        const alpha = transparency && s[0] < transparency.length;
        rgba = [...palette.subarray(s[0] * 3, s[0] * 3 + 3)];
        rgba.push(alpha ? transparency[s[0]] : 255);
      } else {
        const colour = s.slice(0, colourType === 0 || colourType === 4 ? 1 : 3);
        const rgb =
          colour.length === 1 ? [colour[0], colour[0], colour[0]] : colour;
        const keyed =
          transparency &&
          (colourType === 0
            ? transparency.readUInt16BE(0) === s[0]
            : colourType === 2 &&
              [0, 1, 2].every(c => transparency.readUInt16BE(c * 2) === s[c]));
        const alpha = colourType === 4 ? s[1] : colourType === 6 ? s[3] : max;
        rgba = [...rgb.map(scale), keyed ? 0 : scale(alpha)];
      }
      pixels.push(hex(rgba[3] === 255 ? rgba.slice(0, 3) : rgba));
    }
  });
  return { width, height, bitDepth, colourType, pixels };
};

module.exports = { readPng };
