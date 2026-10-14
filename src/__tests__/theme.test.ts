import { PixelRatio } from 'react-native';
import { colors, ruleWidth } from '../theme';

describe('theme — no component library, own black-and-white tokens (US-01-01, DEC-44)', () => {
  it('holds black and white only, for the E-ink screen', () => {
    expect(Object.values(colors).sort()).toEqual(['#000000', '#FFFFFF']);
  });

  it('draws rules an even number of whole device pixels wide, so no grey edge is drawn (NFR-07)', () => {
    const pixels = ruleWidth * PixelRatio.get();
    expect(Number.isInteger(pixels)).toBe(true);
    expect(pixels % 2).toBe(0);
  });
});
