// US-02-01#4 — every element on screen is pure black or pure white; any other colour fails the
// test (NFR-07, constitution: E-ink rendering).
import { View } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import RootLayout from '../../src/app/_layout';
import CategoriesScreen from '../../src/app/index';
import { type HostNode, coloursOf, hostNodes } from './support/app-tree';
import { appSources, readSource } from './support/sources';

const BLACK_AND_WHITE = ['#000000', '#FFFFFF'];
const otherColours = (nodes: HostNode[]) =>
  nodes
    .flatMap(coloursOf)
    .filter(
      ({ value }) =>
        typeof value !== 'string' ||
        !BLACK_AND_WHITE.includes(value.toUpperCase()),
    );

describe('AC-02-01-4 Every element on the category screen is pure black or pure white', () => {
  it('step 1 — the app, navigation included, draws in #000000 and #FFFFFF only', async () => {
    await renderRouter({ _layout: RootLayout, index: CategoriesScreen });
    const nodes = hostNodes(screen.toJSON());

    expect(nodes.flatMap(coloursOf).length).toBeGreaterThan(0);
    expect(otherColours(nodes)).toEqual([]);
  });

  it('step 2 — an element in a third colour is reported', async () => {
    await render(
      <View>
        <CategoriesScreen />
        <View testID="grey" style={{ backgroundColor: '#808080' }} />
      </View>,
    );

    expect(otherColours(hostNodes(screen.toJSON()))).toEqual([
      { element: 'View', key: 'backgroundColor', value: '#808080' },
    ]);
  });

  it('step 3 — no colour is written outside the theme; the app configuration is black and white', () => {
    appSources()
      .filter((file: string) => file !== 'src/theme.ts')
      .forEach((file: string) => {
        const source = readSource(file);
        expect({
          file,
          colours: source.match(
            /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?)\(|colou?r['"]?\s*:\s*['"]/gi,
          ),
        }).toEqual({ file, colours: null });
      });

    const config = readSource('app.json');
    const configColours = [
      ...config.matchAll(/"\w*colou?r"\s*:\s*"([^"]*)"/gi),
    ].map(m => m[1].toUpperCase());
    expect(configColours.length).toBeGreaterThan(0);
    configColours.forEach(colour => expect(BLACK_AND_WHITE).toContain(colour));
  });
});
