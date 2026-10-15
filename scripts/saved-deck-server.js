// The saved 3+ deck, read from the device while a flow runs: the release build has no app-state
// bridge (DEC-55), so the flows of TC-03-18 and TC-03-19 ask this server for the app state their
// steps note. Run by scripts/test-acceptance.sh, on the device rooted, as run_language_flows leaves it.
//
//   node scripts/saved-deck-server.js <adb> <app id> <port> <evidence dir>
//
// GET /<name> answers with what the app keeps in deck-3%2B.json in its private files (empty when
// there is none) and keeps it as evidence in <evidence dir>/<name>.json. It listens on the host's
// loopback only: Maestro runs a flow's scripts on the host.
const { execFileSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const [adb, appId, port, dir] = process.argv.slice(2);
const deckFile = `/data/data/${appId}/files/deck-3%2B.json`;

fs.mkdirSync(dir, { recursive: true });

http
  .createServer((request, response) => {
    const name = decodeURIComponent(request.url.slice(1)).replace(
      /[^\w.-]/g,
      '_',
    );
    let deck = '';
    try {
      deck = execFileSync(adb, ['shell', `cat ${deckFile} 2>/dev/null`], {
        encoding: 'utf8',
      });
    } catch {
      // No saved deck: an empty answer.
    }
    if (name) fs.writeFileSync(path.join(dir, `${name}.json`), deck);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(deck);
  })
  .listen(Number(port), '127.0.0.1');
