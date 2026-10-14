// The README records the platform versions the app is built on (US-01-01#1); this keeps that record
// in step with what is installed.
const fs = require('fs');
const path = require('path');
const { MIN_SDK_VERSION } = require('../../plugins/withMinSdk');

const readme = fs.readFileSync(path.join(__dirname, '../../README.md'), 'utf8');
const recorded = readme.slice(
  readme.indexOf('## Platform versions'),
  readme.indexOf('\n## ', readme.indexOf('## Platform versions') + 1),
);
const rowOf = what =>
  recorded.split('\n').find(line => line.startsWith(`| ${what} |`));
const installed = name => require(`${name}/package.json`).version;
const sdkCatalog = fs.readFileSync(
  require.resolve('react-native/gradle/libs.versions.toml'),
  'utf8',
);
const sdk = name => sdkCatalog.match(new RegExp(`^${name} = "(\\d+)"`, 'm'))[1];

describe('AC-01-01-1 The platform versions the app is built on are recorded', () => {
  it('step 1 — the README records the installed Expo, React Native, React and TypeScript versions', () => {
    expect(rowOf('Expo SDK')).toContain(`\`expo\` ${installed('expo')}`);
    expect(rowOf('Expo SDK')).toContain(
      `\`expo-router\` ${installed('expo-router')}`,
    );
    expect(rowOf('Expo SDK')).toContain(
      `| ${installed('expo').split('.')[0]} (`,
    );
    expect(rowOf('React Native')).toContain(`| ${installed('react-native')} `);
    expect(rowOf('React')).toContain(`| ${installed('react')} |`);
    expect(rowOf('TypeScript')).toContain(`| ${installed('typescript')} |`);
  });

  it('step 2 — the README records the Android versions the app is built for', () => {
    expect(rowOf('Android')).toContain(`minSdk ${MIN_SDK_VERSION} (Android 12`);
    expect(rowOf('Android')).toContain(
      `targetSdk and compileSdk ${sdk('targetSdk')}`,
    );
    expect(sdk('compileSdk')).toBe(sdk('targetSdk'));
  });
});
