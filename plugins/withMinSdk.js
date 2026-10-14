// Android 12 (API 31) is the oldest Android the app supports (NFR-10, DEC-16): an older device
// refuses to install it. Expo's Gradle plugin reads the value from gradle.properties.
const { withGradleProperties } = require('expo/config-plugins');

const MIN_SDK_VERSION = 31;

const setMinSdk = properties => [
  ...properties.filter(item => item.key !== 'android.minSdkVersion'),
  {
    type: 'property',
    key: 'android.minSdkVersion',
    value: String(MIN_SDK_VERSION),
  },
];

const withMinSdk = config =>
  withGradleProperties(config, gradle => {
    gradle.modResults = setMinSdk(gradle.modResults);
    return gradle;
  });

module.exports = withMinSdk;
module.exports.setMinSdk = setMinSdk;
module.exports.MIN_SDK_VERSION = MIN_SDK_VERSION;
