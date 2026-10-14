// US-02-01#5 — nothing animates and no transition is animated; a test fails if an animation is
// enabled (NFR-03, constitution: E-ink rendering).
import { screen } from '@testing-library/react-native';
import { Stack } from 'expo-router';
import { renderRouter } from 'expo-router/testing-library';
import RootLayout from '../../src/app/_layout';
import CategoriesScreen from '../../src/app/index';
import { stackScreenOptions } from '../../src/theme';
import { type HostNode, hostNodes } from './support/app-tree';
import { appSources, readSource } from './support/sources';

// The transition each screen of the native stack is given, as the native view receives it.
const transitions = (nodes: HostNode[]) =>
  nodes
    .filter(node => node.type === 'RNSScreen')
    .map(node => node.props.stackAnimation);

describe('AC-02-01-5 Nothing on the category screen animates and no transition is animated', () => {
  it('step 1 — every screen of the navigation stack has no transition', async () => {
    await renderRouter({ _layout: RootLayout, index: CategoriesScreen });
    const found = transitions(hostNodes(screen.toJSON()));

    expect(found.length).toBeGreaterThan(0);
    found.forEach(transition => expect(transition).toBe('none'));
  });

  it('step 2 — a screen given an animated transition is reported', async () => {
    const Animated = () => (
      <Stack
        screenOptions={{ ...stackScreenOptions, animation: 'slide_from_right' }}
      />
    );
    await renderRouter({ _layout: Animated, index: CategoriesScreen });

    expect(transitions(hostNodes(screen.toJSON()))).toEqual([
      'slide_from_right',
    ]);
  });

  it('step 3 — no source uses an animation API or a component that animates by itself', () => {
    const animating =
      /\b(Animated|LayoutAnimation|ActivityIndicator|TouchableOpacity|TouchableHighlight)\b|react-native-reanimated|animation\w*\s*[:=]\s*['"{](?!none['"])/g;
    appSources().forEach((file: string) => {
      const source = readSource(file);
      expect({ file, found: source.match(animating) }).toEqual({
        file,
        found: null,
      });
    });
  });
});
