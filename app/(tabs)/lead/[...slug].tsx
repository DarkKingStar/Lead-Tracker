import { StyleSheet, View  } from 'react-native';
import ContainPage from '../../../components/ContainPage';

import { useLocalSearchParams } from 'expo-router';
import { TabAnimation } from '../../../components/TabAnimation';
import bgimg from '../../../assets/images/bgimg.png';
import { ImageBackground } from 'expo-image';
import { ScaledSheet } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import UserDetails from '../../../components/Userdetails';



export default function LeadScreen() {
  const { slug } = useLocalSearchParams();
  return (
    <View style={styles.container}>
        <ImageBackground  source={bgimg} style={{flex:1}}>
          <TabAnimation>
              <ContainPage leadId={slug[0]} userId={slug[1]}/>
      </TabAnimation>
        </ImageBackground>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: '30@s',
    height: '1@s',
    width: '80%',
  },
});

