import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Pressable onPress={()=> router.push('/(auth)/otpverify')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={()=> router.push('/(auth)/forgotpassword')}>
        <Text>forgot password?</Text>
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
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
