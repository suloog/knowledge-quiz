import { Stack } from 'expo-router';

const RootLayout = () => {
  return <Stack screenOptions={{ headerShown: false, animation: 'none' }} />;
};

export default RootLayout;
