import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import UserDetails from '../../../components/Userdetails';
import ContainPage from '../../../components/ContainPage';
import { ImageBackground } from 'expo-image';
import bgimg from '../../../assets/images/bgimg.png';
import { useAuth } from '../../../context/AuthContext';

export default function LeadScreen() {
  const {userData} = useAuth();
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ImageBackground  source={bgimg} style={{flex:1}}>
         {userData.userId!=null && <ContainPage leadId={'1'} userId={userData.userId}/>}
      </ImageBackground>
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
