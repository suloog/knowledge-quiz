import { StyleSheet, Text } from 'react-native';
import { appContent } from '@/content';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text testID="content-title" style={styles.title}>
        {appContent.title}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;
