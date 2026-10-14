import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../index';

jest.mock('@/content', () => ({
  appContent: { title: 'Value from the content data' },
}));

describe('HomeScreen', () => {
  it('shows the title read from the bundled content data', async () => {
    await render(<HomeScreen />);

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Value from the content data',
    );
  });
});
