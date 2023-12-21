import { Alert, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import UserDetails from '../../components/Userdetails';
import { useAuth } from '../../context/AuthContext';
import { divStyles } from '../../styles/DivElement';
import { textStyles } from '../../styles/TextElement';

export default function ProfileScreen() {

  const {OnLogout} = useAuth();
  const handleLogout = () =>{
    Alert.alert(
        'Are you sure',
        'Do you really want to log out?',
        [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: async() => await OnLogout() },
        ],
        { cancelable: false }
      );
  }

  return (
    <View style={styles.container}>
      <UserDetails/>
      <Pressable style={divStyles.submitButton} onPress={()=>handleLogout()}>
          <Text style={textStyles.buttonText}>Logout</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
