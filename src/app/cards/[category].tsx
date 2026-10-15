import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { decks } from '@/content';
import { deviceLanguage } from '@/language';
import { colors, largestType, ruleWidth } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// A touch this soon after the card or its answer is drawn is ignored, so a child's double touch
// never reveals and skips a card in one go (MOD-03-F14, DEC-40).
export const TOUCH_GUARD_MS = 500;

type Card = { position: number; revealed: boolean };

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
// place — no transition, no animation (NFR-03). The deck is gone through in its data order and
// starts over after its last card until US-03-02 shuffles it and US-03-03 ends it (DEC-53).
const CardScreen = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const deck = decks.find(d => d.category === category);
  const { width } = useWindowDimensions();
  const [card, setCard] = useState<Card>({ position: 0, revealed: false });
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

  if (!deck) return null;
  const count = deck.questions.length;
  const text = deck.questions[card.position][deviceLanguage()];

  const touch = () => {
    if (readyAt.current === null || Date.now() < readyAt.current) return;
    readyAt.current = null;
    setCard(current =>
      current.revealed
        ? { position: (current.position + 1) % count, revealed: false }
        : { ...current, revealed: true },
    );
  };

  return (
    <SafeAreaView testID="card-screen" style={styles.screen}>
      <Pressable
        testID={`card-${card.position}`}
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
          {card.revealed && (
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
});

export default CardScreen;
