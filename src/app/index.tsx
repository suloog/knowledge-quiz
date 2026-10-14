import { StyleSheet, Text } from 'react-native';
import { appContent } from '@/content';
import { colors } from '@/theme';
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
    backgroundColor: colors.paper,
  },
  title: {
    fontSize: 32,
    color: colors.ink,
  },
});

export default HomeScreen;
