import { StyleSheet, View } from 'react-native';
import UserDetails from '../../../components/Userdetails';
import { ImageBackground } from 'expo-image';
import bgimg from '../../../assets/images/bgimg.png';
import ContainPageSearch from '../../../components/ContainPageSearch';
import { useAuth } from '../../../context/AuthContext';
import ContainPage from '../../../components/ContainPage';

export default function SearchLeadScreen() {
  const {searchDataValue, userData} = useAuth(); 
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ImageBackground  source={bgimg} style={{flex:1}}>
        {searchDataValue.length>0?<ContainPageSearch/>: (userData.userId!=null && <ContainPage leadId={'1'} userId={userData.userId}/>)}
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