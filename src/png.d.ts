// The PNG files the app imports (src/content/illustrations): Metro turns each into an image source.
declare module '*.png' {
  import type { ImageRequireSource } from 'react-native';

  const source: ImageRequireSource;
  export default source;
}
