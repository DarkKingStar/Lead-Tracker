import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import UserDetails from '../../components/Userdetails'
import Menu from '../../components/Menu';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ScrollView>
        <Menu/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#FF008C',
  },
});
