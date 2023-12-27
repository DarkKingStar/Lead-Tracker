import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import UserDetails from '../../../components/Userdetails';
import ContainPage from '../../../components/ContainPage';

import { useLocalSearchParams } from 'expo-router';
import { TabAnimation } from '../../../components/TabAnimation';
import bgimg from '../../../assets/images/bgimg.png';
import { ImageBackground } from 'expo-image';



export default function LeadScreen() {
  const { slug } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <UserDetails/>
        <ImageBackground  source={bgimg} style={{flex:1}}>
      <TabAnimation>
        <ContainPage leadId={slug[0]} userId={slug[1]}/>
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
