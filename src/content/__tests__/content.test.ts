import app from '../app.json';
import { appContent } from '../index';

describe('appContent', () => {
  it('exposes the title kept in the content data file', () => {
    expect(appContent.title).toBe(app.title);
    expect(appContent.title.trim()).not.toHaveLength(0);
  });
});
