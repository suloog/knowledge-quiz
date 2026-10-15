import { categories } from '../index';

jest.mock('../decks', () => ({
  decks: [
    { category: 'Extra' },
    { category: '5+' },
    { category: '10+' },
    { category: '3+' },
  ],
}));

describe('categories', () => {
  it('lists the decks youngest first, labels without a leading age last', () => {
    expect(categories).toEqual(['3+', '5+', '10+', 'Extra']);
  });
});
