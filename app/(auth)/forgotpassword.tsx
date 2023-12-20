import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { router } from 'expo-router';

export default function ForgotPassswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>forgot Password</Text>
      <Pressable onPress={()=> router.push('/(auth)')}>
        <Text>submit</Text>
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
