import { appContent } from '../index';

describe('appContent', () => {
  it.each(['pl', 'en'] as const)(
    'exposes a non-empty %s title from the content data file (DEC-61)',
    language => {
      expect(typeof appContent.title[language]).toBe('string');
      expect(appContent.title[language].trim()).not.toHaveLength(0);
    },
  );

  it('names the app "Quiz wiedzy" in Polish and "Knowledge Quiz" in English (DEC-61)', () => {
    expect(appContent.title).toEqual({
      pl: 'Quiz wiedzy',
      en: 'Knowledge Quiz',
    });
  });
});
