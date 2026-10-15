import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { decks } from '@/content';
import { t } from '@/i18n';
import { deviceLanguage } from '@/language';
import {
  type Progress,
  isFinished,
  markSeen,
  openDeck,
  restartDeck,
} from '@/progress';
import { colors, largestType, ruleWidth } from '@/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// A touch this soon after the card or its answer is drawn is ignored, so a child's double touch
// never reveals and skips a card in one go (MOD-03-F14, DEC-40).
export const TOUCH_GUARD_MS = 500;

// Where the category's deck stands, and whether the card on screen has its answer revealed: then it
// is the last seen card, otherwise the first unseen one — or, once every card is seen, the end card.
type Card = { progress: Progress; revealed: boolean };

// The card's padding on either side.
const PADDING = 24;
// How wide a character of the card's type is at most, as a share of the type size — Roboto Bold
// averages about half of it.
const CHARACTER_WIDTH = 0.6;

// The size a text is set in on a card this wide: the app's largest type, or less when its longest
// word would not fit one line — Android splits such a word mid-way. A text that is still too tall
// for its part of the card shrinks further as it is drawn (adjustsFontSizeToFit; DEC-53).
export const cardType = (text: string, width: number) => {
  const longestWord = Math.max(...text.split(/\s+/).map(word => word.length));
  return Math.min(
    largestType,
    Math.floor((width - 2 * PADDING) / (longestWord * CHARACTER_WIDTH)),
  );
};

// The cards of one category, one at a time: a touch anywhere reveals the answer below the
// question, the next touch shows the next question (MOD-03-F01…F05). Both change the content in
// place — no transition, no animation (NFR-03). The deck is shuffled once and gone through without
// repeats, resuming where it was left (MOD-03-F06…F08); after its last card the end card offers to
// start it again or go back to the categories (MOD-03-F09…F11, DEC-56). From any card, Android's back
// action or the small control above the card returns to the categories (MOD-03-F12, F13).
const CardScreen = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const deck = decks.find(d => d.category === category);
  const { width } = useWindowDimensions();
  const [card, setCard] = useState<Card | null>(() =>
    deck ? { progress: openDeck(deck), revealed: false } : null,
  );
  // When touches count again; null until the new frame is drawn.
  const readyAt = useRef<number | null>(null);

  // The guard starts when the frame showing the change is drawn, not when the touch was handled
  // (DEC-40): the first animation frame after the change is committed.
  useEffect(() => {
    readyAt.current = null;
    const frame = requestAnimationFrame(() => {
      readyAt.current = Date.now() + TOUCH_GUARD_MS;
    });
    return () => cancelAnimationFrame(frame);
  }, [card]);

  if (!deck || !card) return null;
  const { progress, revealed } = card;

  // A touch counts only once the screen has been shown for the guard's time (MOD-03-F14).
  const ready = () => {
    if (readyAt.current === null || Date.now() < readyAt.current) return false;
    readyAt.current = null;
    return true;
  };

  // Back to the category screen below this one, never a second one on top (MOD-03-F11, F13). The
  // deck stays as it is: a card left unrevealed is not seen (DEC-38).
  const categories = () => {
    if (ready()) router.dismissTo('/');
  };

  if (!revealed && isFinished(progress)) {
    const again = () => {
      if (ready()) setCard({ progress: restartDeck(deck), revealed: false });
    };
    return (
      <SafeAreaView testID="end-card" style={styles.screen}>
        <View style={styles.endArea}>
          <Text
            testID="deck-finished"
            role="heading"
            style={[
              styles.question,
              { fontSize: cardType(t('deckFinished'), width) },
            ]}>
            {t('deckFinished')}
          </Text>
        </View>
        <Pressable testID="again" role="button" onPressIn={again}>
          <Text
            style={[styles.choice, { fontSize: cardType(t('again'), width) }]}>
            {t('again')}
          </Text>
        </Pressable>
        <Pressable testID="categories" role="button" onPressIn={categories}>
          <Text
            style={[
              styles.choice,
              { fontSize: cardType(t('categories'), width) },
            ]}>
            {t('categories')}
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const position = revealed ? progress.seen - 1 : progress.seen;
  const id = progress.order[position];
  const text = deck.questions.find(question => question.id === id)![
    deviceLanguage()
  ];

  // A reveal makes the card seen and saves it (MOD-03-F07); the next touch shows the first unseen
  // card, or the end card once none is left.
  const touch = () => {
    if (!ready()) return;
    if (!revealed)
      setCard({ progress: markSeen(deck.category, progress), revealed: true });
    else setCard({ progress, revealed: false });
  };

  return (
    <SafeAreaView testID="card-screen" style={styles.screen}>
      {/* The way back to the categories besides Android's back: a small line above the card, set
          apart by a rule and outside its touch area, so touching it never reveals or moves on
          (MOD-03-F13, DEC-58). */}
      <View style={styles.returnBar}>
        <Pressable
          testID="return-control"
          role="button"
          accessibilityLabel={t('backToCategoriesLabel')}
          onPressIn={categories}
          style={styles.returnControl}>
          <Text style={styles.returnText}>{t('backToCategories')}</Text>
        </Pressable>
      </View>
      <Pressable
        testID={`card-${position}`}
        onPressIn={touch}
        style={styles.card}>
        {/* The answer's place is kept while it is hidden, so revealing it draws the rule and the
            answer and leaves the question as it was (MOD-03-F04, NFR-04). */}
        <View style={styles.questionArea}>
          <Text
            testID="question"
            adjustsFontSizeToFit
            style={[
              styles.question,
              { fontSize: cardType(text.question, width) },
            ]}>
            {text.question}
          </Text>
        </View>
        <View style={styles.answerArea}>
          {revealed && (
            <>
              <View testID="rule" style={styles.rule} />
              <Text
                testID="answer"
                adjustsFontSizeToFit
                style={[
                  styles.answer,
                  { fontSize: cardType(text.answer, width) },
                ]}>
                {text.answer}
              </Text>
            </>
          )}
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  // Small beside the card's type, but a touch target a finger finds (NFR-08).
  returnBar: {
    flexDirection: 'row',
    borderBottomWidth: ruleWidth,
    borderColor: colors.ink,
  },
  returnControl: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: PADDING,
  },
  returnText: {
    fontSize: 20,
    color: colors.ink,
  },
  card: {
    flex: 1,
    paddingHorizontal: PADDING,
    paddingVertical: PADDING,
  },
  questionArea: {
    flex: 3,
  },
  answerArea: {
    flex: 2,
  },
  // The app's largest type, shrunk only as far as a long question needs to fit (MOD-03-U01, DEC-53).
  question: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.ink,
  },
  // The answer is set apart from the question by a full-width rule and regular weight (MOD-03-U04).
  rule: {
    height: ruleWidth,
    marginBottom: 16,
    backgroundColor: colors.ink,
  },
  answer: {
    flex: 1,
    color: colors.ink,
  },
  // The end card: what it says above, its two choices below, full width like the category entries
  // (MOD-02-U01, NFR-08).
  endArea: {
    flex: 1,
    padding: PADDING,
  },
  choice: {
    paddingHorizontal: PADDING,
    paddingVertical: PADDING,
    borderTopWidth: ruleWidth,
    borderColor: colors.ink,
    fontWeight: 'bold',
    color: colors.ink,
  },
});

export default CardScreen;
