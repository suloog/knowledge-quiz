import { useState } from 'react';
import {
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { type Language, appContent, categories } from '@/content';
import { languageName, useLanguage } from '@/i18n';
import { lastCategory, rememberCategory } from '@/lastCategory';
import { colors, largestType, ruleWidth } from '@/theme';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cardType } from './cards/[category]';

const LANGUAGES: Language[] = ['pl', 'en'];

// The screen every launch opens on: the age categories the content data holds (MOD-02-F01…F03);
// choosing one opens its cards (MOD-02-F04). Once a category has been opened, a continue entry above
// the list leads back to it, where its deck was left (MOD-02-F05…F09). Under the title, the switch
// between Polish and English for the whole app (MOD-02-F10, U04; DEC-60).
const CategoriesScreen = () => {
  const { language, choose, t } = useLanguage();
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
        {appContent.title[language]}
      </Text>
      {/* Each language named in itself, the same in either app language; the active one drawn
          inverted, white on black. */}
      <View
        testID="language-switch"
        role="radiogroup"
        accessibilityLabel={t('language')}
        style={styles.languages}>
        {LANGUAGES.map(option => {
          const active = option === language;
          return (
            <Pressable
              key={option}
              testID={`language-${option}`}
              role="radio"
              accessibilityState={{ checked: active }}
              onPress={() => choose(option)}
              style={[styles.language, active && styles.activeLanguage]}>
              <Text
                style={[
                  styles.languageText,
                  active && styles.activeLanguageText,
                ]}>
                {languageName(option)}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
      {/* Every entry stays on the screen, which does not scroll: on a short screen the entries give
          up the space above and below their names, never the names' size (DEC-64). */}
      {categories.map((category, index) => (
        <Pressable
          key={category}
          role="button"
          onPress={() => open(category)}
          style={styles.entry}>
          <View style={styles.entrySpace} />
          <Text testID={`category-${index}`} style={styles.entryText}>
            {category}
          </Text>
          <View style={styles.entrySpace} />
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
  // A touch target a finger finds, smaller than the categories (NFR-08). The padding is the text's
  // own, so the text's bounds hold its anti-aliased glyphs well inside them (NFR-07).
  languages: {
    flexDirection: 'row',
    borderBottomWidth: ruleWidth,
    borderColor: colors.ink,
  },
  // A whole number of device pixels high, so the row's edge and every rule below it fall on a pixel
  // boundary — a fractional edge is drawn as a row of grey (NFR-07). A minimum, not a height: with
  // the system's text made larger the row grows instead of clipping its label.
  language: {
    flex: 1,
    minHeight: PixelRatio.roundToNearestPixel(59),
    justifyContent: 'center',
    backgroundColor: colors.paper,
  },
  activeLanguage: {
    backgroundColor: colors.ink,
  },
  languageText: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 20,
    color: colors.ink,
  },
  activeLanguageText: {
    fontWeight: 'bold',
    color: colors.paper,
  },
  // Full width and large, for a small child to read and touch (MOD-02-U01, NFR-08).
  // The entry shrinks when the screen is short of room; only the space around its name gives way.
  entry: {
    alignSelf: 'stretch',
    flexShrink: 1,
    borderBottomWidth: ruleWidth,
    borderColor: colors.ink,
  },
  entrySpace: {
    height: 24,
    flexShrink: 1,
  },
  entryText: {
    paddingHorizontal: 24,
    fontSize: largestType,
    fontWeight: 'bold',
    color: colors.ink,
  },
  // Each line holds its own padding, so every text's bounds keep more than the 8 dp the screen's
  // colour check allows around the glyphs (NFR-07); the entry adds none, so with the language switch
  // above it the list below still fits a 640 dp high screen (DEC-64).
  continueEntry: {
    alignSelf: 'stretch',
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
