import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { router } from 'expo-router';

export default function verifyotpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>otp verify</Text>
      <Pressable onPress={()=>router.push('/(tabs)')}>
        <Text>Verify</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
