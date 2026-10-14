const fs = require('fs');
const os = require('os');
const path = require('path');
const appConfig = require('../../app.json');
const withReleaseNoNetwork = require('../withReleaseNoNetwork');
const { releaseManifest } = withReleaseNoNetwork;

const removed = manifest =>
  [...manifest.matchAll(/<uses-permission ([^>]*)\/>/g)]
    .filter(([, attributes]) => attributes.includes('tools:node="remove"'))
    .map(([, attributes]) => attributes.match(/android:name="([^"]+)"/)[1]);

describe('AC-01-01-3 The release build asks for no network permission', () => {
  it('step 1 — the release manifest removes every network permission', () => {
    expect(removed(releaseManifest())).toEqual([
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.ACCESS_WIFI_STATE',
    ]);
  });

  it('writes it as the release source set manifest, applied by the app config', async () => {
    expect(appConfig.expo.plugins).toContain('./plugins/withReleaseNoNetwork');

    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kq-android-'));
    try {
      const config = withReleaseNoNetwork({ name: 'kq', slug: 'kq' });
      await config.mods.android.dangerous({
        modRequest: { platformProjectRoot: root },
      });

      expect(
        fs.readFileSync(
          path.join(root, 'app', 'src', 'release', 'AndroidManifest.xml'),
          'utf8',
        ),
      ).toBe(releaseManifest());
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
