import { Pressable, StyleSheet, Text } from 'react-native';
import { appContent, categories } from '@/content';
import { colors, largestType, ruleWidth } from '@/theme';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// The screen every launch opens on: the age categories the content data holds (MOD-02-F01…F03);
// choosing one opens its cards (MOD-02-F04).
const CategoriesScreen = () => {
  // This screen is the bottom of the stack: once a category's cards are open on top of it, a touch
  // still on its way to an entry — a fast double touch — opens nothing more (DEC-58).
  const open = (category: string) => {
    if (router.canGoBack()) return;
    router.push({ pathname: '/cards/[category]', params: { category } });
  };

  return (
    <SafeAreaView testID="category-screen" style={styles.screen}>
      <Text testID="content-title" role="heading" style={styles.title}>
        {appContent.title}
      </Text>
      {categories.map((category, index) => (
        <Pressable key={category} role="button" onPress={() => open(category)}>
          <Text testID={`category-${index}`} style={styles.entry}>
            {category}
          </Text>
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  title: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: ruleWidth,
    borderColor: colors.ink,
    fontSize: 32,
    color: colors.ink,
  },
  // Full width and large, for a small child to read and touch (MOD-02-U01, NFR-08).
  entry: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: ruleWidth,
    borderColor: colors.ink,
    fontSize: largestType,
    fontWeight: 'bold',
    color: colors.ink,
  },
});

export default CategoriesScreen;
