import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScaledSheet } from 'react-native-size-matters';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nothing to Show Here</Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '20@s',
    fontFamily: 'RubikExtraBold',
  },
  separator: {
    marginVertical: '30@s',
    height: 1,
    width: '80%',
  },
});
