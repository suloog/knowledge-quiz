// The repository's files, read the way the acceptance tests check them (Node, so plain JavaScript:
// the TypeScript project has no Node types).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../..');

// The text of a file, by its path from the repository root.
const readSource = file => fs.readFileSync(path.join(root, file), 'utf8');

// Every TypeScript source of the app, tests aside, by its path from the repository root.
const appSources = (dir = 'src') =>
  fs
    .readdirSync(path.join(root, dir), { withFileTypes: true })
    .flatMap(entry => {
      const at = `${dir}/${entry.name}`;
      if (entry.isDirectory())
        return entry.name === '__tests__' ? [] : appSources(at);
      return /\.tsx?$/.test(entry.name) ? [at] : [];
    });

module.exports = { appSources, readSource };
