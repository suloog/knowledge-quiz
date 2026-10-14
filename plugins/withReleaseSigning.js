// The release APK is signed with the upload key Maciej keeps outside the repository (NFR-06,
// DEC-09, DEC-44). The keystore path, alias and passwords come from Gradle properties — set in
// ~/.gradle/gradle.properties or as environment variables of the same names. A release build
// without them fails; it is never signed with the debug key.
const { withAppBuildGradle } = require('expo/config-plugins');

const UPLOAD_KEYS = [
  'KQ_UPLOAD_STORE_FILE',
  'KQ_UPLOAD_STORE_PASSWORD',
  'KQ_UPLOAD_KEY_ALIAS',
  'KQ_UPLOAD_KEY_PASSWORD',
];

const SETUP = [
  '// Release signing (NFR-06, DEC-44): the upload key stays outside the repository.',
  'def kqUpload = { String name -> findProperty(name) ?: System.getenv(name) }',
  `def kqUploadKeys = [${UPLOAD_KEYS.map(key => `'${key}'`).join(', ')}]`,
  'gradle.taskGraph.whenReady { graph ->',
  '    def missing = kqUploadKeys.findAll { !kqUpload(it) }',
  '    if (missing && graph.allTasks.any { it.project == project && it.name ==~ /(assemble|bundle|package|sign).*Release.*/ }) {',
  '        throw new GradleException("The release build is signed with the upload key kept outside the repository (NFR-06). Set ${missing.join(\', \')} in ~/.gradle/gradle.properties or the environment.")',
  '    }',
  '}',
  '',
].join('\n');

const RELEASE_SIGNING_CONFIG = [
  '    signingConfigs {',
  '        release {',
  '            if (kqUploadKeys.every { kqUpload(it) }) {',
  "                storeFile file(kqUpload('KQ_UPLOAD_STORE_FILE'))",
  "                storePassword kqUpload('KQ_UPLOAD_STORE_PASSWORD')",
  "                keyAlias kqUpload('KQ_UPLOAD_KEY_ALIAS')",
  "                keyPassword kqUpload('KQ_UPLOAD_KEY_PASSWORD')",
  '            }',
  '        }',
].join('\n');

const RELEASE_BUILD_TYPE =
  /(\n\s*release \{\n(?:\s*\/\/[^\n]*\n)*\s*signingConfig )signingConfigs\.debug/;

const replaceOnce = (text, pattern, replacement, what) => {
  if (!pattern.test(text)) {
    throw new Error(
      `withReleaseSigning: ${what} not found in app/build.gradle`,
    );
  }
  return text.replace(pattern, replacement);
};

const setReleaseSigning = gradle => {
  if (gradle.includes('KQ_UPLOAD_STORE_FILE')) {
    return gradle;
  }
  let result = replaceOnce(
    gradle,
    /\nandroid \{\n/,
    `\n${SETUP}\nandroid {\n`,
    'the android block',
  );
  result = replaceOnce(
    result,
    /\n    signingConfigs \{/,
    `\n${RELEASE_SIGNING_CONFIG}`,
    'signingConfigs',
  );
  return replaceOnce(
    result,
    RELEASE_BUILD_TYPE,
    '$1signingConfigs.release',
    'the release build type',
  );
};

const withReleaseSigning = config =>
  withAppBuildGradle(config, gradle => {
    gradle.modResults.contents = setReleaseSigning(gradle.modResults.contents);
    return gradle;
  });

module.exports = withReleaseSigning;
module.exports.setReleaseSigning = setReleaseSigning;
module.exports.UPLOAD_KEYS = UPLOAD_KEYS;
