// Every age category's deck. A new category is its JSON file plus one import line here (DEC-46);
// the content checks fail on a deck file that is not listed.
import type { Deck } from '../deck';
import threePlus from './3-plus.json';
import fourPlus from './4-plus.json';

export const decks = [threePlus, fourPlus] as Deck[];
