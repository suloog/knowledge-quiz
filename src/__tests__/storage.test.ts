import { load, save } from '../storage';

// The app's private files, in memory: file name → content.
const mockFiles = new Map<string, string>();
jest.mock('expo-file-system', () => ({
  Paths: { document: 'files' },
  File: class {
    name: string;
    constructor(_directory: string, name: string) {
      this.name = name;
    }
    get exists() {
      return mockFiles.has(this.name);
    }
    textSync() {
      const content = mockFiles.get(this.name);
      if (content === undefined) throw new Error('no such file');
      return content;
    }
    write(content: string) {
      mockFiles.set(this.name, content);
    }
  },
}));

beforeEach(() => mockFiles.clear());

describe('storage — the one persistence module (DEC-54)', () => {
  it('gives back what was saved under a key', () => {
    save('deck-3+', { order: ['a', 'b'], seen: 1 });

    expect(load('deck-3+')).toEqual({ order: ['a', 'b'], seen: 1 });
  });

  it('keeps each key in a file of its own, named safely', () => {
    save('deck-3+', 1);
    save('deck-4+', 2);

    expect([...mockFiles.keys()]).toEqual(['deck-3%2B.json', 'deck-4%2B.json']);
    expect(load('deck-4+')).toBe(2);
  });

  it('gives nothing for a key never saved', () => {
    expect(load('deck-3+')).toBeUndefined();
  });

  it('gives nothing for a file that is not JSON, instead of failing', () => {
    mockFiles.set('deck-3%2B.json', '{"order": [');

    expect(load('deck-3+')).toBeUndefined();
  });
});
