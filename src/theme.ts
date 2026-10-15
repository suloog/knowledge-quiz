import { PixelRatio } from 'react-native';
import { DefaultTheme } from 'expo-router';

// The app's only colours (constitution: E-ink rendering; DEC-44): black ink on white paper.
export const colors = {
  ink: '#000000',
  paper: '#FFFFFF',
} as const;

// The width of every rule (border) the app draws: an even number of whole device pixels, about
// 2 dp. Android strokes a border on its centre line, so a fractional or odd pixel count is drawn
// with a grey row of anti-aliasing on either side — and the screen must have no greys (NFR-07):
// 2 dp is 5.25 px at density 2.625, drawn as 4 black rows between two #808080 ones.
const pixelRatio = PixelRatio.get();
export const ruleWidth = (2 * Math.max(1, Math.round(pixelRatio))) / pixelRatio;

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
