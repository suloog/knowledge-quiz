import { screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import RootLayout from '../_layout';
import CategoriesScreen from '../index';

describe('RootLayout', () => {
  it('opens the app on the category screen', async () => {
    await renderRouter({ _layout: RootLayout, index: CategoriesScreen });

    expect(screen.getByTestId('category-screen')).toBeOnTheScreen();
  });
});
