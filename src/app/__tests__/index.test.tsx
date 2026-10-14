import { render, screen } from '@testing-library/react-native';
import CategoriesScreen from '../index';

jest.mock('@/content/app.json', () => ({
  title: 'Value from the content data',
}));
// Registered out of order, as a maintainer might: the screen still lists them youngest first.
jest.mock('@/content/decks', () => ({
  decks: [{ category: '5+' }, { category: '3+' }, { category: '4+' }],
}));

describe('CategoriesScreen', () => {
  it('shows the title read from the bundled content data', async () => {
    await render(<CategoriesScreen />);

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Value from the content data',
    );
  });

  it('lists the categories of the content data in the order 3+, 4+, 5+', async () => {
    await render(<CategoriesScreen />);

    expect(screen.getByTestId('category-0')).toHaveTextContent('3+');
    expect(screen.getByTestId('category-1')).toHaveTextContent('4+');
    expect(screen.getByTestId('category-2')).toHaveTextContent('5+');
    expect(screen.queryByTestId('category-3')).toBeNull();
  });
});
