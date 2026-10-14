const { execFileSync } = require('child_process');
const appConfig = require('../../app.json');
const { setReleaseSigning, UPLOAD_KEYS } = require('../withReleaseSigning');

// app/build.gradle exactly as `expo prebuild` writes it for the installed Expo SDK.
const templateBuildGradle = execFileSync(
  'tar',
  [
    '-xzOf',
    require.resolve('expo/template.tgz'),
    'package/android/app/build.gradle',
  ],
  { encoding: 'utf8' },
);

const block = (gradle, start) => {
  const from = gradle.indexOf(start);
  let depth = 0;
  for (let i = gradle.indexOf('{', from); i < gradle.length; i += 1) {
    if (gradle[i] === '{') depth += 1;
    if (gradle[i] === '}') depth -= 1;
    if (depth === 0) return gradle.slice(from, i + 1);
  }
  throw new Error(`${start} is not closed`);
};

describe('AC-01-01-5 The release APK is signed with a key kept outside the repository', () => {
  const gradle = setReleaseSigning(templateBuildGradle);
  const buildTypes = block(gradle, '    buildTypes {');
  const releaseBuildType = block(buildTypes, '        release {');
  const releaseSigning = block(
    block(gradle, '    signingConfigs {'),
    '        release {',
  );

  it('step 1 — the release build type signs with the release signing config, never the debug key', () => {
    expect(appConfig.expo.plugins).toContain('./plugins/withReleaseSigning');
    expect(releaseBuildType).toContain('signingConfig signingConfigs.release');
    expect(releaseBuildType).not.toContain('signingConfigs.debug');
  });

  it('step 2 — the key comes from KQ_UPLOAD_* Gradle properties or the environment, not from the repository', () => {
    expect(UPLOAD_KEYS).toEqual([
      'KQ_UPLOAD_STORE_FILE',
      'KQ_UPLOAD_STORE_PASSWORD',
      'KQ_UPLOAD_KEY_ALIAS',
      'KQ_UPLOAD_KEY_PASSWORD',
    ]);
    expect(gradle).toContain(
      'def kqUpload = { String name -> findProperty(name) ?: System.getenv(name) }',
    );
    UPLOAD_KEYS.forEach(key =>
      expect(releaseSigning).toContain(`kqUpload('${key}')`),
    );
    expect(releaseSigning).not.toMatch(/keystore|android'/);
  });

  it('step 3 — a release build without the key fails and names what is missing', () => {
    expect(gradle).toContain('gradle.taskGraph.whenReady');
    expect(gradle).toMatch(
      /throw new GradleException\("The release build is signed with the upload key kept outside the repository \(NFR-06\)\. Set \$\{missing\.join/,
    );
  });

  it('leaves the debug build signed with the debug key and changes the file only once', () => {
    expect(block(buildTypes, '        debug {')).toContain(
      'signingConfig signingConfigs.debug',
    );
    expect(setReleaseSigning(gradle)).toBe(gradle);
  });

  it('stops the prebuild when the build file no longer has the expected shape', () => {
    expect(() => setReleaseSigning('android {}')).toThrow(/withReleaseSigning/);
  });
});
