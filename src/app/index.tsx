import { StyleSheet, Text } from 'react-native';
import { appContent, categories } from '@/content';
import { colors, ruleWidth } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

// The screen every launch opens on: the age categories the content data holds (MOD-02-F01…F03).
const CategoriesScreen = () => {
  return (
    <SafeAreaView testID="category-screen" style={styles.screen}>
      <Text testID="content-title" role="heading" style={styles.title}>
        {appContent.title}
      </Text>
      {categories.map((category, index) => (
        <Text key={category} testID={`category-${index}`} style={styles.entry}>
          {category}
        </Text>
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
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.ink,
  },
});

export default CategoriesScreen;
