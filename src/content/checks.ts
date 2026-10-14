// The automatic content checks (MOD-01-F02…F07, F11, F12, F15). Each returns what is wrong; the test
// suite fails on anything returned, so content that breaks a check is never released.
import { CONTENT_KINDS, type Deck } from './deck';

export const QUESTIONS_PER_CATEGORY = 50;
export const MAX_QUESTION_LENGTH = 100;
export const MAX_ANSWER_LENGTH = 60;
export const MIN_PER_KIND = 5;
const LANGUAGES = ['pl', 'en'] as const;

const isText = (value: unknown) =>
  typeof value === 'string' && value.trim().length > 0;

export const checkDeck = (deck: Deck): string[] => {
  const problems: string[] = [];
  const where = `deck ${deck.category}`;

  if (deck.schemaVersion !== 1) {
    problems.push(`${where}: schemaVersion is not 1`);
  }
  if (!isText(deck.category)) {
    problems.push(`${where}: no category label`);
  }
  if (deck.questions.length !== QUESTIONS_PER_CATEGORY) {
    problems.push(
      `${where}: ${deck.questions.length} questions, not ${QUESTIONS_PER_CATEGORY}`,
    );
  }

  deck.questions.forEach((question, index) => {
    const at = `${where}, question ${question.id ?? `#${index + 1}`}`;
    if (!isText(question.id)) {
      problems.push(`${at}: no id`);
    }
    if (!CONTENT_KINDS.includes(question.kind)) {
      problems.push(`${at}: unknown kind ${String(question.kind)}`);
    }
    if (question.illustration !== undefined && !isText(question.illustration)) {
      problems.push(`${at}: illustration is not a file name`);
    }
    LANGUAGES.forEach(language => {
      const text = question[language];
      if (!isText(text?.question)) {
        problems.push(`${at}: no ${language} question`);
      } else if (text.question.length > MAX_QUESTION_LENGTH) {
        problems.push(
          `${at}: ${language} question longer than ${MAX_QUESTION_LENGTH} characters`,
        );
      }
      // Exactly one answer: a single non-empty string, never a list.
      if (!isText(text?.answer)) {
        problems.push(`${at}: not exactly one ${language} answer`);
      } else if (text.answer.length > MAX_ANSWER_LENGTH) {
        problems.push(
          `${at}: ${language} answer longer than ${MAX_ANSWER_LENGTH} characters`,
        );
      }
    });
  });

  CONTENT_KINDS.forEach(kind => {
    const count = deck.questions.filter(q => q.kind === kind).length;
    if (count < MIN_PER_KIND) {
      problems.push(
        `${where}: ${count} ${kind} questions, fewer than ${MIN_PER_KIND}`,
      );
    }
  });

  return problems;
};

// Across decks: every category once, every question id once — a question belongs to exactly one
// age category (MOD-01-F02) and saved deck orders can refer to it.
export const checkDecks = (decks: Deck[]): string[] => {
  const problems = decks.flatMap(checkDeck);
  const seen = (values: string[]) =>
    values.filter((value, index) => values.indexOf(value) !== index);
  seen(decks.map(deck => deck.category)).forEach(category =>
    problems.push(`category ${category} appears in more than one deck`),
  );
  seen(decks.flatMap(deck => deck.questions.map(q => q.id))).forEach(id =>
    problems.push(`question id ${id} appears more than once`),
  );
  return problems;
};
