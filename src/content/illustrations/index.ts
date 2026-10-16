// Every question illustration, by the file name a deck's question gives in `illustration` (US-03-05).
// A new illustration is its PNG here — 1-bit black and white (MOD-01-F13) — plus one line below: the
// app can only show an image it imports. The content checks fail on a file that is not listed and on
// a question naming one that is not.
import type { ImageRequireSource } from 'react-native';
import ant from './ant.png';
import clock from './clock.png';
import hand from './hand.png';
import spider from './spider.png';
import treeRings from './tree-rings.png';

export const illustrations: Record<string, ImageRequireSource> = {
  'ant.png': ant,
  'clock.png': clock,
  'hand.png': hand,
  'spider.png': spider,
  'tree-rings.png': treeRings,
};
