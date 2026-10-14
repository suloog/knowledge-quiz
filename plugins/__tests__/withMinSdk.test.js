const appConfig = require('../../app.json');
const { setMinSdk, MIN_SDK_VERSION } = require('../withMinSdk');

describe('AC-01-01-1 withMinSdk — the Android version the app is built for', () => {
  it('makes Android 12 (API 31) the oldest Android the app installs on', () => {
    expect(MIN_SDK_VERSION).toBe(31);
    expect(
      setMinSdk([
        { type: 'property', key: 'android.minSdkVersion', value: '24' },
        { type: 'property', key: 'newArchEnabled', value: 'true' },
      ]),
    ).toEqual([
      { type: 'property', key: 'newArchEnabled', value: 'true' },
      { type: 'property', key: 'android.minSdkVersion', value: '31' },
    ]);
  });

  it('is applied by the app config', () => {
    expect(appConfig.expo.plugins).toContain('./plugins/withMinSdk');
  });
});
