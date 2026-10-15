import { colors } from '../theme';

describe('theme — no component library, own black-and-white tokens (US-01-01, DEC-44)', () => {
  it('holds black and white only, for the E-ink screen', () => {
    expect(Object.values(colors).sort()).toEqual(['#000000', '#FFFFFF']);
  });

  it.each([1, 2, 2.625, 2.75, 3, 3.5])(
    'draws rules an even number of whole device pixels wide at density %p, so no grey edge is drawn (NFR-07)',
    ratio => {
      // A module registry of its own, so theme.ts reads the mocked ratio when it loads.
      let ruleWidth = 0;
      jest.isolateModules(() => {
        const { PixelRatio } =
          jest.requireActual<typeof import('react-native')>('react-native');
        jest.spyOn(PixelRatio, 'get').mockReturnValue(ratio);
        ({ ruleWidth } =
          jest.requireActual<typeof import('../theme')>('../theme'));
      });
      const pixels = ruleWidth * ratio;
      expect(pixels).toBeCloseTo(Math.round(pixels), 9);
      expect(Math.round(pixels) % 2).toBe(0);
      expect(Math.round(pixels)).toBeGreaterThanOrEqual(2);
    },
  );
});
