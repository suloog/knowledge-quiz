import { navigationTheme, stackScreenOptions } from '@/theme';
import { Stack, ThemeProvider } from 'expo-router';

const RootLayout = () => {
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack screenOptions={stackScreenOptions} />
    </ThemeProvider>
  );
};

export default RootLayout;
