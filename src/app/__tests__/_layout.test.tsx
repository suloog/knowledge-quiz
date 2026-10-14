import { screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import RootLayout from '../_layout';
import HomeScreen from '../index';

jest.mock('@/content', () => ({
  appContent: { title: 'Value from the content data' },
}));

describe('RootLayout', () => {
  it('opens the app on the home screen', async () => {
    await renderRouter({ _layout: RootLayout, index: HomeScreen });

    expect(screen.getByTestId('content-title')).toBeOnTheScreen();
  });
});
