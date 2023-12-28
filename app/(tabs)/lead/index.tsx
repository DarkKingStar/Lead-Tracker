import { StyleSheet,View  } from 'react-native';
import UserDetails from '../../../components/Userdetails';
import ContainPage from '../../../components/ContainPage';
import { ImageBackground } from 'expo-image';
import bgimg from '../../../assets/images/bgimg.png';
import { useAuth } from '../../../context/AuthContext';
import { TabAnimation } from '../../../components/TabAnimation';

export default function LeadScreen() {
  const {userData} = useAuth();
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ImageBackground  source={bgimg} style={{flex:1}}>
        <TabAnimation>
          {userData.userId!=null && <ContainPage leadId={'1'} userId={userData.userId}/>}
        </TabAnimation>
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
