import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import UserDetails from '../../../components/Userdetails';
import { ImageBackground } from 'expo-image';
import bgimg from '../../../assets/images/bgimg.png';
import ContainPageSearch from '../../../components/ContainPageSearch';

export default function SearchLeadScreen() {
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ImageBackground  source={bgimg} style={{flex:1}}>
          <ContainPageSearch/>
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
