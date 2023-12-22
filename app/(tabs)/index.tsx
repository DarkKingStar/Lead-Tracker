import { ScrollView, StyleSheet } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Text, View } from '../../components/Themed';
import UserDetails from '../../components/Userdetails'
import Menu from '../../components/Menu';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {authState} = useAuth();
  useEffect(() => { 
    navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        if(authState.token !=null){
          router.replace('/(tabs)/');
        }
        // navigation.dispatch(e.data.action);
    });
},[navigation]);
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ScrollView>
        <Menu/>
      </ScrollView>
    </View>
  );
}
HomeScreen.navigationOptions = {
  headerLeft: null, // This will hide the back button
};
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
