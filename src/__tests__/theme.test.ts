import { colors } from '../theme';

describe('theme', () => {
  it('holds black and white only, for the E-ink screen', () => {
    expect(Object.values(colors).sort()).toEqual(['#000000', '#FFFFFF']);
  });
});
