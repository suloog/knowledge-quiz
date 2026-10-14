import { appContent } from '../index';

describe('appContent', () => {
  it('exposes a non-empty title from the content data file', () => {
    expect(typeof appContent.title).toBe('string');
    expect(appContent.title.trim()).not.toHaveLength(0);
  });
});
