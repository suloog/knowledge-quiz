// The shipped app asks for no network permission (NFR-05, DEC-44). Only the release build: the
// debug build that `yarn stack` and the acceptance tests run loads its JavaScript from Metro, which
// Android refuses without INTERNET. A release-only manifest removes the permissions at merge time,
// whichever library declares them.
const fs = require('fs');
const path = require('path');
const { withDangerousMod } = require('expo/config-plugins');

const NETWORK_PERMISSIONS = [
  'android.permission.INTERNET',
  'android.permission.ACCESS_NETWORK_STATE',
  'android.permission.ACCESS_WIFI_STATE',
];

const releaseManifest = () =>
  [
    '<manifest xmlns:android="http://schemas.android.com/apk/res/android"',
    '    xmlns:tools="http://schemas.android.com/tools">',
    ...NETWORK_PERMISSIONS.map(
      name =>
        `    <uses-permission android:name="${name}" tools:node="remove" />`,
    ),
    '</manifest>',
    '',
  ].join('\n');

const withReleaseNoNetwork = config =>
  withDangerousMod(config, [
    'android',
    async mod => {
      const dir = path.join(
        mod.modRequest.platformProjectRoot,
        'app',
        'src',
        'release',
      );
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(
        path.join(dir, 'AndroidManifest.xml'),
        releaseManifest(),
      );
      return mod;
    },
  ]);

module.exports = withReleaseNoNetwork;
module.exports.releaseManifest = releaseManifest;
module.exports.NETWORK_PERMISSIONS = NETWORK_PERMISSIONS;
