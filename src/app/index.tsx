import { useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { appContent, categories } from '@/content';
import { t } from '@/i18n';
import { lastCategory, rememberCategory } from '@/lastCategory';
import { colors, largestType, ruleWidth } from '@/theme';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cardType } from './cards/[category]';

// The screen every launch opens on: the age categories the content data holds (MOD-02-F01…F03);
// choosing one opens its cards (MOD-02-F04). Once a category has been opened, a continue entry above
// the list leads back to it, where its deck was left (MOD-02-F05…F09).
const CategoriesScreen = () => {
  // Read once, when the app starts; from then on this screen is the only place a category is
  // opened, so it knows the last one itself.
  const [last, setLast] = useState(lastCategory);
  const { width } = useWindowDimensions();

  // This screen is the bottom of the stack: once a category's cards are open on top of it, a touch
  // still on its way to an entry — a fast double touch — opens nothing more (DEC-58).
  const open = (category: string) => {
    if (router.canGoBack()) return;
    rememberCategory(category);
    setLast(category);
    router.push({ pathname: '/cards/[category]', params: { category } });
  };

  return (
    <SafeAreaView testID="category-screen" style={styles.screen}>
      <Text testID="content-title" role="heading" style={styles.title}>
        {appContent.title}
      </Text>
      {/* Inverted, white on black, so it stands apart from the list below it, whose order it never
          changes (MOD-02-U02, DEC-21, DEC-59). Its deck opens where it was left, or on its end card.
          "Kontynuuj" and the category's name stand on lines of their own, each as large as a card's
          words may be on this screen's width (DEC-53): on one line, Android drew only "Kontynuuj". */}
      {last && (
        <Pressable
          testID="continue-entry"
          role="button"
          accessibilityLabel={`${t('continue')} ${last}`}
          onPress={() => open(last)}
          style={styles.continueEntry}>
          <Text
            testID="continue"
            style={[
              styles.continueText,
              { fontSize: cardType(t('continue'), width) },
            ]}>
            {t('continue')}
          </Text>
          <Text
            testID="continue-category"
            style={[styles.continueText, { fontSize: cardType(last, width) }]}>
            {last}
          </Text>
        </Pressable>
      )}
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
  // The entry's padding is shared with its two lines, each holding half of it, so every text's bounds
  // keep more than the 8 dp the screen's colour check allows around the glyphs (NFR-07).
  continueEntry: {
    alignSelf: 'stretch',
    paddingVertical: 12,
    backgroundColor: colors.ink,
  },
  continueText: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontWeight: 'bold',
    color: colors.paper,
  },
});

export default CategoriesScreen;
