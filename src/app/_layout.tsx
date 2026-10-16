import { LanguageProvider } from '@/i18n';
import { navigationTheme, stackScreenOptions } from '@/theme';
import { Stack, ThemeProvider } from 'expo-router';

const RootLayout = () => {
  return (
    <LanguageProvider>
      <ThemeProvider value={navigationTheme}>
        <Stack screenOptions={stackScreenOptions} />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default RootLayout;
