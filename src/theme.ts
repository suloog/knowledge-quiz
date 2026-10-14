import { DefaultTheme } from 'expo-router';

// The app's only colours (constitution: E-ink rendering; DEC-44): black ink on white paper.
export const colors = {
  ink: '#000000',
  paper: '#FFFFFF',
} as const;

// The navigation's own colours, black and white too: its default screen background is a light grey.
export const navigationTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    primary: colors.ink,
    background: colors.paper,
    card: colors.paper,
    text: colors.ink,
    border: colors.ink,
    notification: colors.ink,
  },
};

// Every screen: no header, no animated transition, white paper underneath (NFR-03, NFR-07).
export const stackScreenOptions = {
  headerShown: false,
  animation: 'none',
  contentStyle: { backgroundColor: colors.paper },
} as const;
