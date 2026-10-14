import { colors } from '../theme';

describe('theme — no component library, own black-and-white tokens (US-01-01, DEC-44)', () => {
  it('holds black and white only, for the E-ink screen', () => {
    expect(Object.values(colors).sort()).toEqual(['#000000', '#FFFFFF']);
  });
});
