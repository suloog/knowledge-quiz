import { load, save } from '../storage';

// The app's private files, in memory: file name → content. A write fails while mockFull is set,
// as on a device with no space left.
const mockFiles = new Map<string, string>();
let mockFull = false;
jest.mock('expo-file-system', () => ({
  Paths: { document: 'files' },
  File: class MockFile {
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
      if (mockFull) throw new Error('no space left on device');
      mockFiles.set(this.name, content);
    }
    moveSync(destination: MockFile, options?: { overwrite?: boolean }) {
      if (mockFiles.has(destination.name) && !options?.overwrite)
        throw new Error('destination exists');
      mockFiles.set(destination.name, mockFiles.get(this.name)!);
      mockFiles.delete(this.name);
    }
  },
}));

beforeEach(() => {
  mockFiles.clear();
  mockFull = false;
});

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

  it('replaces what was saved before, leaving no other file behind', () => {
    save('deck-3+', { order: ['a', 'b'], seen: 1 });
    save('deck-3+', { order: ['a', 'b'], seen: 2 });

    expect(load('deck-3+')).toEqual({ order: ['a', 'b'], seen: 2 });
    expect([...mockFiles.keys()]).toEqual(['deck-3%2B.json']);
  });

  it('writes into a file of its own first, so the saved one is never written in part', () => {
    save('deck-3+', 1);
    mockFull = true;
    save('deck-3+', 2);

    expect(load('deck-3+')).toBe(1);
  });

  it('a write that fails is not remembered, instead of failing', () => {
    mockFull = true;

    expect(() => save('deck-3+', 1)).not.toThrow();
    expect(load('deck-3+')).toBeUndefined();
  });

  it('gives nothing for a key never saved', () => {
    expect(load('deck-3+')).toBeUndefined();
  });

  it('gives nothing for a file that is not JSON, instead of failing', () => {
    mockFiles.set('deck-3%2B.json', '{"order": [');

    expect(load('deck-3+')).toBeUndefined();
  });
});
